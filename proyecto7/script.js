function encontrar_maximo_divide_conquer(arr, left, right, process_steps, depth = 0) {
    const indent = '  '.repeat(depth);
    
    process_steps.push({
        type: 'divide',
        message: `${indent}Dividiendo: analizando subarreglo [${left}, ${right}] -> [${arr.slice(left, right + 1).join(', ')}]`
    });
    
    if (left === right) {
        process_steps.push({
            type: 'base-case',
            message: `${indent}Caso base: un solo elemento [${arr[left]}], maximo = ${arr[left]}`
        });
        return arr[left];
    }
    
    const mid = Math.floor((left + right) / 2);
    
    process_steps.push({
        type: 'divide',
        message: `${indent}Punto medio: ${mid}, dividiendo en [${left}, ${mid}] y [${mid + 1}, ${right}]`
    });
    
    const max_left = encontrar_maximo_divide_conquer(arr, left, mid, process_steps, depth + 1);
    const max_right = encontrar_maximo_divide_conquer(arr, mid + 1, right, process_steps, depth + 1);
    
    const max_global = Math.max(max_left, max_right);
    
    process_steps.push({
        type: 'combine',
        message: `${indent}Combinando: max_left = ${max_left}, max_right = ${max_right} -> maximo = ${max_global}`
    });
    
    return max_global;
}

function encontrar_maximo(numbers_string) {
    if (!numbers_string || numbers_string.trim() === '') {
        return {
            max: null,
            message: 'El arreglo esta vacio',
            process_steps: []
        };
    }
    
    const numbers_array = numbers_string.split(',')
        .map(num => num.trim())
        .filter(num => num !== '')
        .map(num => parseFloat(num));
    
    if (numbers_array.length === 0) {
        return {
            max: null,
            message: 'No se encontraron numeros validos',
            process_steps: []
        };
    }
    
    if (numbers_array.some(isNaN)) {
        return {
            max: null,
            message: 'El arreglo contiene valores no numericos',
            process_steps: []
        };
    }
    
    const process_steps = [];
    
    process_steps.push({
        type: 'info',
        message: `Iniciando algoritmo Divide y Venceras`
    });
    process_steps.push({
        type: 'info',
        message: `Arreglo original: [${numbers_array.join(', ')}]`
    });
    process_steps.push({
        type: 'info',
        message: `Longitud del arreglo: ${numbers_array.length} elementos`
    });
    process_steps.push({
        type: 'info',
        message: `--- Inicio de recursion ---`
    });
    
    const max_value = encontrar_maximo_divide_conquer(numbers_array, 0, numbers_array.length - 1, process_steps);
    
    process_steps.push({
        type: 'result',
        message: `--- Fin de recursion ---`
    });
    process_steps.push({
        type: 'result',
        message: `Resultado final: el numero maximo es ${max_value}`
    });
    
    return {
        max: max_value,
        array: numbers_array,
        message: `El numero maximo encontrado es ${max_value}`,
        process_steps: process_steps
    };
}

function update_results() {
    const numbers_input = document.getElementById('numbers_input');
    const numbers_string = numbers_input.value;
    
    const result = encontrar_maximo(numbers_string);
    
    const max_number_span = document.getElementById('max_number');
    const array_display_span = document.getElementById('array_display');
    const divide_process_div = document.getElementById('divide_process');
    
    if (result.max !== null) {
        max_number_span.textContent = result.max;
        array_display_span.textContent = `[${result.array.join(', ')}]`;
        
        max_number_span.style.animation = 'none';
        max_number_span.offsetHeight;
        max_number_span.style.animation = 'pulse 0.5s ease-out';
    } else {
        max_number_span.textContent = '---';
        array_display_span.textContent = result.message;
    }
    
    if (result.process_steps && result.process_steps.length > 0) {
        divide_process_div.innerHTML = result.process_steps.map(step => {
            let step_class = 'process-step';
            if (step.type === 'divide') {
                step_class += ' divide';
            } else if (step.type === 'base-case') {
                step_class += ' base-case';
            } else if (step.type === 'combine') {
                step_class += ' combine';
            } else if (step.type === 'result') {
                step_class += ' result';
            }
            return `<div class="${step_class}">${step.message}</div>`;
        }).join('');
    } else {
        divide_process_div.innerHTML = `<div class="process-step">${result.message}</div>`;
    }
    
    if (result.max !== null) {
        document.querySelector('.result-card').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

function demonstrate_divide_conquer_in_console() {
    const numbers_input = document.getElementById('numbers_input');
    const numbers_string = numbers_input.value;
    
    if (!numbers_string || numbers_string.trim() === '') {
        console.log('No hay numeros para analizar');
        return;
    }
    
    const numbers_array = numbers_string.split(',')
        .map(num => num.trim())
        .filter(num => num !== '')
        .map(num => parseFloat(num));
    
    if (numbers_array.length === 0 || numbers_array.some(isNaN)) {
        console.log('Arreglo invalido');
        return;
    }
    
    console.clear();
    console.log('DEMOSTRACION DE DIVIDE Y VENCERAS');
    console.log('='.repeat(50));
    console.log(`Arreglo original: [${numbers_array.join(', ')}]`);
    console.log(`Longitud: ${numbers_array.length} elementos`);
    console.log('-'.repeat(50));
    
    function demostrar_dyc(arr, left, right, depth = 0) {
        const indent = '  '.repeat(depth);
        console.log(`${indent}Analizando [${left}, ${right}]: [${arr.slice(left, right + 1).join(', ')}]`);
        
        if (left === right) {
            console.log(`${indent}  -> Caso base: maximo = ${arr[left]}`);
            return arr[left];
        }
        
        const mid = Math.floor((left + right) / 2);
        console.log(`${indent}  Dividiendo en [${left}, ${mid}] y [${mid + 1}, ${right}]`);
        
        const max_left = demostrar_dyc(arr, left, mid, depth + 1);
        const max_right = demostrar_dyc(arr, mid + 1, right, depth + 1);
        
        const max_global = Math.max(max_left, max_right);
        console.log(`${indent}  Combinando: max_left=${max_left}, max_right=${max_right} -> maximo=${max_global}`);
        
        return max_global;
    }
    
    const maximo = demostrar_dyc(numbers_array, 0, numbers_array.length - 1);
    console.log('-'.repeat(50));
    console.log(`RESULTADO: El numero maximo es ${maximo}`);
}

document.addEventListener('DOMContentLoaded', () => {
    const find_button = document.getElementById('find_button');
    const example_buttons = document.querySelectorAll('.btn-example');
    
    find_button.addEventListener('click', update_results);
    
    example_buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const example_numbers = button.getAttribute('data-numbers');
            const numbers_input = document.getElementById('numbers_input');
            numbers_input.value = example_numbers;
            update_results();
            demonstrate_divide_conquer_in_console();
        });
    });
    
    const numbers_input = document.getElementById('numbers_input');
    numbers_input.addEventListener('keypress', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            update_results();
        }
    });
    
    console.log('Proyecto Divide y Venceras - Encontrar el numero maximo');
    console.log('Tip: Puedes ver el proceso de division en la consola del navegador');
    console.log('Presiona Ctrl+Enter para analizar los numeros');
});

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .process-step {
        animation: fadeIn 0.3s ease-out;
    }
`;
document.head.appendChild(style);