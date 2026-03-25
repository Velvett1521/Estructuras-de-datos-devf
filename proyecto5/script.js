function find_longest_word_with_sliding_window(text) {
    if (!text || text.trim() === '') {
        return {
            word: '',
            length: 0,
            process: []
        };
    }
    
    const words = text.split(' ');
    const process_steps = [];
    
    process_steps.push(`📝 Texto original: "${text}"`);
    process_steps.push(`🔪 Dividiendo en palabras: [${words.map(w => `"${w}"`).join(', ')}]`);
    process_steps.push(`📊 Total de palabras: ${words.length}`);
    process_steps.push('');
    
    let longest_word = '';
    let max_length = 0;
    
    process_steps.push(`🪟 INICIO DEL ALGORITMO SLIDING WINDOW`);
    process_steps.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    
    for (let i = 0; i < words.length; i++) {
        const current_word = words[i];
        const current_length = current_word.length;
        
        process_steps.push(`\n🪟 Ventana [${i + 1}/${words.length}]: "${current_word}"`);
        process_steps.push(`   Longitud actual: ${current_length} caracteres`);
        
        if (current_length > max_length) {
            const old_word = longest_word || 'ninguna';
            longest_word = current_word;
            max_length = current_length;
            process_steps.push(`   ✅ ¡NUEVA PALABRA MÁS LARGA!`);
            process_steps.push(`   Antes: "${old_word}" (${max_length - current_length + current_length} caracteres)`);
            process_steps.push(`   Ahora: "${longest_word}" (${max_length} caracteres)`);
        } else {
            process_steps.push(`   ⏭️  No supera a "${longest_word || 'ninguna'}" (${max_length} caracteres)`);
        }
    }
    
    process_steps.push(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    process_steps.push(`🎉 RESULTADO FINAL:`);
    process_steps.push(`   Palabra más larga: "${longest_word}"`);
    process_steps.push(`   Longitud: ${max_length} caracteres`);
    
    return {
        word: longest_word,
        length: max_length,
        process: process_steps
    };
}

function update_results() {
    const text_input = document.getElementById('text_input');
    const text = text_input.value;
    
    if (!text.trim()) {
        alert('Por favor, ingresa algún texto para analizar');
        return;
    }
    
    const result = find_longest_word_with_sliding_window(text);
    
    const longest_word_span = document.getElementById('longest_word');
    const word_length_span = document.getElementById('word_length');
    const process_info_div = document.getElementById('process_info');
    
    if (result.word) {
        longest_word_span.textContent = result.word;
        word_length_span.textContent = result.length;
        
        longest_word_span.style.animation = 'none';
        longest_word_span.offsetHeight;
        longest_word_span.style.animation = 'slideIn 0.5s ease-out';
    } else {
        longest_word_span.textContent = '---';
        word_length_span.textContent = '0';
    }
    
    process_info_div.innerHTML = result.process.map(step => {
        return `<div class="process-step">${step}</div>`;
    }).join('');
    
    document.querySelector('.result-card').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

function demonstrate_algorithm() {
    const text_input = document.getElementById('text_input');
    const text = text_input.value;
    
    if (!text.trim()) {
        console.log('No hay texto para analizar');
        return;
    }
    
    console.clear();
    console.log('🚀 DEMOSTRACIÓN DEL ALGORITMO SLIDING WINDOW');
    console.log('=' .repeat(50));
    
    const words = text.split(' ');
    console.log(`Texto original: "${text}"`);
    console.log(`Palabras:`, words);
    console.log(`Total: ${words.length} palabras\n`);
    
    let longest_word = '';
    let max_length = 0;
    
    for (let i = 0; i < words.length; i++) {
        console.log(`🪟 Ventana ${i + 1}: "${words[i]}" (${words[i].length} caracteres)`);
        
        if (words[i].length > max_length) {
            longest_word = words[i];
            max_length = words[i].length;
            console.log(`   ✅ Nueva palabra más larga: "${longest_word}"`);
        } else {
            console.log(`   ⏭️  Actual más larga: "${longest_word || 'ninguna'}"`);
        }
    }
    
    console.log('\n' + '=' .repeat(50));
    console.log(`🎉 Resultado: "${longest_word}" (${max_length} caracteres)`);
}

document.addEventListener('DOMContentLoaded', () => {
    const find_button = document.getElementById('find_button');
    const example_buttons = document.querySelectorAll('.btn-example');
    
    find_button.addEventListener('click', update_results);
    
    example_buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const example_text = button.getAttribute('data-text');
            const text_input = document.getElementById('text_input');
            text_input.value = example_text;
            update_results();
            demonstrate_algorithm();
        });
    });
    
    const text_input = document.getElementById('text_input');
    text_input.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            update_results();
        }
    });
    
    console.log('🎯 Proyecto Sliding Window - Encuentra la palabra más larga');
    console.log('💡 Tip: Puedes ver el proceso detallado en la consola del navegador');
    console.log('⌨️  Presiona Ctrl+Enter para analizar el texto\n');
});

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
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
        animation: slideIn 0.3s ease-out;
    }
`;
document.head.appendChild(style);