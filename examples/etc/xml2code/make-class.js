function makeClass(input) {
    const lines = input.split('\n').map(line => line.trim()).filter(Boolean);
    const masterClass = lines[0].split(': ')[1];
    const events = {};
    const methods = {};

    lines.slice(1).forEach(line => {
        const [source, target] = line.split(' --> ').map(s => s.split('.'));
        const [sourceClass, sourceMethod] = source;
        const [targetClass, targetMethod] = target;

        if (!events[sourceClass]) {
            events[sourceClass] = [];
        }
        if (!events[targetClass]) {
            events[targetClass] = [];
        }
        if (!methods[sourceClass]) {
            methods[sourceClass] = [];
        }
        if (!methods[targetClass]) {
            methods[targetClass] = [];
        }

        if (sourceMethod.startsWith('On')) {
            events[sourceClass].push(sourceMethod);
        } else {
            methods[sourceClass].push(sourceMethod);
        }

        if (targetMethod.startsWith('On')) {
            events[targetClass].push(targetMethod);
        } else {
            methods[targetClass].push(targetMethod);
        }
    });

    const classes = Object.keys(events).filter(className => className !== masterClass);

    let code = '';

    classes.forEach(className => {
        code += `class ${className}\n{\n`;

        events[className].forEach(eventName => {
            code += `    public delegate void ${eventName}Handler();\n`;
            code += `    public event ${eventName}Handler ${eventName};\n\n`;
        });

        methods[className].forEach(methodName => {
            code += `    public void ${methodName}()\n    {\n\n    }\n`;
        });

        code += '}\n\n';
    });

    code += `class ${masterClass}\n{\n`;
    code += `    public ${masterClass}()\n    {\n`;

    classes.forEach(className => {
        code += `        ${className} ${className.toLowerCase()} = new ${className}();\n`;
    });

    lines.slice(1).forEach(line => {
        const [source, target] = line.split(' --> ').map(s => s.split('.'));
        const [sourceClass, sourceMethod] = source;
        const [targetClass, targetMethod] = target;

        if (sourceMethod.startsWith('On')) {
            code += `        ${sourceClass.toLowerCase()}.${sourceMethod} += ${targetClass.toLowerCase()}.${targetMethod};\n`;
        }
    });

    code += '    }\n\n';

    methods[masterClass].forEach(methodName => {
        code += `    public void ${methodName}()\n    {\n`;
        lines.filter(line => line.startsWith(`${masterClass}.${methodName}`)).forEach(line => {
            const target = line.split(' --> ')[1].split('.')[0];
            code += `        ${target.toLowerCase()}.Start();\n`;
        });
        code += '    }\n';
    });

    code += '}\n';

    return code;
}

module.exports = makeClass;