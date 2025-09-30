const myForm = document.querySelector('#my-Form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email')
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');
myForm.addEventListener('submit', onSubmit);

function  onSubmit  (e)
{
    e.preventDefault();
    if (nameInput.value === '' || emailInput.value === '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please fill all fields';
        setTimeout(() => msg.remove(), 2000);
    }  
    else
    {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${nameInput.value} : ${emailInput.value}`));
        userList.appendChild(li);
        userList.classList.add('users');
        nameInput.value = '';
        emailInput.value ='';
    }
}
