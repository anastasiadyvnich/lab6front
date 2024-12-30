window.addEventListener("DOMContentLoaded", (event) => {
    const getUserButton = document.getElementById('getUser');
    const usersContainer = document.getElementById('users');

    const result = document.getElementById('result');

    const userTemplate = `<div class="user-card">
    <img src="$userImage" alt="Аватар">
    <p>Телефон: <span>$phone</span></p>
    <p>Країна: <span>$country</span></p>
    <p>Email: <span>$email</span></p>
    <p>Координати: <span>$coordinates</span></p>
    </div>`;
   
    getUserButton.addEventListener('click', async() => {
    try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const user = data.results[0];
    
        // Замінюємо placeholder'и у шаблоні на реальні дані
        const newUserHtml = userTemplate
        .replace('$userImage', user.picture.large)
        .replace('$phone', user.cell)
        .replace('$country', user.location.country)
        .replace('$email', user.email)
        .replace('$coordinates', `${user.location.coordinates.latitude}, ${user.location.coordinates.longitude}`);
    
        // Створюємо новий елемент і додаємо його в контейнер
        const newUserDiv = document.createElement('div');
        newUserDiv.innerHTML = newUserHtml;
        usersContainer.appendChild(newUserDiv);
        result.innerHTML = 'success!';
    } catch (error) {
        console.error('Ошибка при отриманні даних:', error);
        result.innerHTML = 'Ошибка при отриманні даних!';
    }
    });
   });