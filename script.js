let lengthSlider = document.querySelector('.pass_length input'),
lengthValue = document.querySelector('.details span'),
copyIcon = document.querySelector('.input_box span'),
generatorBtn = document.querySelector('.generator_btn'),
passIndecator = document.querySelector('.pass_indecator'),
options = document.querySelectorAll('.option input'),
passOutput = document.querySelector('.input_box input');


const generatePassword = () => {
    let staticPassword = '', password = '', excludeDuplicate = false;

    options.forEach(option => {
        if(option.checked){
            if(option.id === 'lowercase') staticPassword += 'abcdefghijklmnopqrstuvwxyz';
            if(option.id === 'uppercase') staticPassword += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            if(option.id === 'number') staticPassword += '0123456789';
            if(option.id === 'symbols') staticPassword += "!@#$%^&*(){}[]:<>?,./+-*";
            if(option.id === 'include_space') staticPassword += `     ${staticPassword}     `;
            if(option.id === 'exclude_duplicate') excludeDuplicate = true;
        }
    });

    for (i = 0; i < lengthSlider.value; i++) {
        let random = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excludeDuplicate){
            !password.includes(random) || random == ' ' ? password += random : i--; 
        }else{
            password += random;
        }
    }

    passOutput.value = password;
    
}

const updateSlider = () => {
    lengthValue.innerText = lengthSlider.value;
    generatePassword();

    // Update indecator
    passIndecator.id = lengthSlider.value < 4 ? 'veryWeek' : lengthSlider.value <= 8 ? 'week' : lengthSlider.value <= 16 ? 'medium' : lengthSlider.value <= 24 ? 'strong' : 'veryStrong';
}

updateSlider();

copyIcon.addEventListener('click', () => {
    navigator.clipboard.writeText(passOutput.value);
    copyIcon.innerText = 'check';
    copyIcon.classList.add('check');
    setTimeout(() => {
        copyIcon.innerText = 'copy_all';
        copyIcon.classList.remove('check');
    }, 1500)
})

lengthSlider.addEventListener('input', updateSlider);
generatorBtn.addEventListener('click', generatePassword);