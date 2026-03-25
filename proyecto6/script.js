function buscar_regalo_recursivo(gifts, gift_name, index, process_steps) {
    if (index === gifts.length) {
        process_steps.push({
            type: 'base-case',
            message: `Caso base: index (${index}) === longitud del arreglo (${gifts.length}) - Regalo no encontrado`
        });
        return {
            found: false,
            position: -1,
            message: `El regalo "${gift_name}" no esta en la lista`
        };
    }
    
    process_steps.push({
        type: 'recursive-call',
        message: `Revisando posicion ${index}: "${gifts[index]}"`
    });
    
    if (gifts[index] === gift_name) {
        process_steps.push({
            type: 'base-case',
            message: `Caso base: gifts[${index}] (${gifts[index]}) === "${gift_name}" - Regalo encontrado`
        });
        return {
            found: true,
            position: index,
            message: `Regalo encontrado! "${gift_name}" esta en la posicion ${index + 1} de la lista`
        };
    }
    
    process_steps.push({
        type: 'recursive-call',
        message: `"${gifts[index]}" no es "${gift_name}", llamada recursiva con index ${index + 1}`
    });
    
    return buscar_regalo_recursivo(gifts, gift_name, index + 1, process_steps);
}

function buscar_regalo(gifts_string, gift_name) {
    if (!gifts_string || gifts_string.trim() === '') {
        return {
            found: false,
            position: -1,
            message: 'La lista de regalos esta vacia',
            process_steps: []
        };
    }
    
    if (!gift_name || gift_name.trim() === '') {
        return {
            found: false,
            position: -1,
            message: 'Por favor ingresa un regalo para buscar',
            process_steps: []
        };
    }
    
    const gifts_array = gifts_string.split(',').map(gift => gift.trim().toLowerCase());
    const gift_to_find = gift_name.trim().toLowerCase();
    const process_steps = [];
    
    process_steps.push({
        type: 'info',
        message: `Iniciando busqueda recursiva del regalo "${gift_to_find}"`
    });
    process_steps.push({
        type: 'info',
        message: `Lista de regalos: [${gifts_array.map(g => `"${g}"`).join(', ')}]`
    });
    process_steps.push({
        type: 'info',
        message: `Longitud de la lista: ${gifts_array.length} regalos`
    });
    process_steps.push({
        type: 'info',
        message: `--- Inicio de recursion ---`
    });
    
    const result = buscar_regalo_recursivo(gifts_array, gift_to_find, 0, process_steps);
    
    process_steps.push({
        type: 'result',
        message: `--- Fin de recursion ---`
    });
    process_steps.push({
        type: 'result',
        message: result.message
    });
    
    return {
        found: result.found,
        position: result.position,
        message: result.message,
        process_steps: process_steps
    };
}

function update_results() {
    const gift_list_input = document.getElementById('gift_list_input');
    const gift_search_input = document.getElementById('gift_search_input');
    const gift_list = gift_list_input.value;
    const gift_name = gift_search_input.value;
    
    const result = buscar_regalo(gift_list, gift_name);
    
    const result_message_div = document.getElementById('result_message');
    const recursion_process_div = document.getElementById('recursion_process');
    
    result_message_div.textContent = result.message;
    
    if (result.found) {
        result_message_div.className = 'result-message found';
    } else if (result.message.includes('vacia') || result.message.includes('ingresa')) {
        result_message_div.className = 'result-message';
    } else {
        result_message_div.className = 'result-message not-found';
    }
    
    recursion_process_div.innerHTML = result.process_steps.map(step => {
        let step_class = 'process-step';
        if (step.type === 'recursive-call') {
            step_class += ' recursive-call';
        } else if (step.type === 'base-case') {
            step_class += ' base-case';
        } else if (step.type === 'result') {
            step_class += ' result';
        }
        return `<div class="${step_class}">${step.message}</div>`;
    }).join('');
    
    document.querySelector('.result-card').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

function demonstrate_recursion_in_console() {
    const gift_list_input = document.getElementById('gift_list_input');
    const gift_search_input = document.getElementById('gift_search_input');
    const gift_list = gift_list_input.value;
    const gift_name = gift_search_input.value;
    
    if (!gift_list || !gift_name) {
        console.log('Faltan datos para la demostracion');
        return;
    }
    
    console.clear();
    console.log('DEMOSTRACION DE RECURSION - BUSCADOR DE REGALOS');
    console.log('='.repeat(50));
    
    const gifts_array = gift_list.split(',').map(gift => gift.trim().toLowerCase());
    const gift_to_find = gift_name.trim().toLowerCase();
    
    console.log(`Lista de regalos: [${gifts_array.join(', ')}]`);
    console.log(`Buscando: "${gift_to_find}"`);
    console.log('-'.repeat(50));
    
    function demostrar_recursion(gifts, target, index) {
        console.log(`Llamada recursiva #${index + 1}: revisando posicion ${index} -> "${gifts[index] || 'undefined'}"`);
        
        if (index === gifts.length) {
            console.log(`  Caso base: Se revisaron todos los regalos`);
            console.log(`  Resultado: "${target}" NO encontrado`);
            return false;
        }
        
        if (gifts[index] === target) {
            console.log(`  Caso base: "${gifts[index]}" === "${target}"`);
            console.log(`  Resultado: "${target}" encontrado en posicion ${index + 1}`);
            return true;
        }
        
        console.log(`  "${gifts[index]}" no es "${target}", continuando recursion...`);
        return demostrar_recursion(gifts, target, index + 1);
    }
    
    const found = demostrar_recursion(gifts_array, gift_to_find, 0);
    console.log('-'.repeat(50));
    console.log(`Resultado final: ${found ? 'ENCONTRADO' : 'NO ENCONTRADO'}`);
}

document.addEventListener('DOMContentLoaded', () => {
    const search_button = document.getElementById('search_button');
    const example_buttons = document.querySelectorAll('.btn-example');
    
    search_button.addEventListener('click', update_results);
    
    example_buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const example_list = button.getAttribute('data-list');
            const example_gift = button.getAttribute('data-gift');
            const gift_list_input = document.getElementById('gift_list_input');
            const gift_search_input = document.getElementById('gift_search_input');
            
            gift_list_input.value = example_list;
            gift_search_input.value = example_gift;
            update_results();
            demonstrate_recursion_in_console();
        });
    });
    
    const gift_search_input = document.getElementById('gift_search_input');
    gift_search_input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            update_results();
        }
    });
    
    console.log('Proyecto de Recursion y Backtracking - Buscador de Regalos');
    console.log('Tip: Puedes ver el proceso recursivo en la consola del navegador');
    console.log('Presiona Enter para buscar el regalo');
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