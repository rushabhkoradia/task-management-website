//const taskContainer = document.querySelector(".task__container");
//console.log(taskContainer);
let globalStore = []; // Array of objects

const generateNewCard = (taskData) => `
    <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
        <div class="card shadow">
            <div class="card-header d-flex justify-content-between">
                <div>
                    <h4 class="text-primary fs-2 fw-bolder">${taskData.taskHeading}</h4>
                </div>
                <div>
                    <button type="button" class="btn btn-outline-success">
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button type="button" class="btn btn-outline-danger" id=${taskData.id} onClick="deleteCard.apply(this, arguments)">
                        <i class="fas fa-trash-alt"  id=${taskData.id} onClick="deleteCard.apply(this, arguments)"></i>
                    </button>
                </div>
            </div>
            <img src=${taskData.taskImage} class="card-img-top p-3" alt="Card Image">
            <div class="card-body">
                <h5 class="card-title fw-bolder">${taskData.taskTitle}</h5>
                <p class="card-text fw-light fst-italic">${taskData.taskDescription}</p>
                <a href=${taskData.taskLocation} target="__blank" class="btn btn-primary">Go</a>
            </div>
        </div>
    </div>
    `;

const loadInitialCardData = () => {
    const getCardData = localStorage.getItem("my_taskify"); // accessing localStorage data
    const {cards} = JSON.parse(getCardData); // convert to normal object
    cards.map((cardObject) => {
        document.querySelector(".task__container").insertAdjacentHTML("beforeend", generateNewCard(cardObject)); // create dynamic HTML cards and insert it into DOM
        globalStore.push(cardObject); // push card to Global Storage
    })
};

// Delete Card
const deleteCard = (event) => {
    event = window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagName;

    globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
    localStorage.setItem("my_taskify", JSON.stringify({cards: globalStore}));

    if (tagname === "BUTTON") {
        return document.querySelector(".task__container").removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
    } else {
        return document.querySelector(".task__container").removeChild(event.target.parentNode.parentNode.parentNode.parentNode.parentNode);
    }
};

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`,
        taskImage: document.getElementById("task__image").value, 
        taskHeading: document.getElementById("task__heading").value,
        taskTitle: document.getElementById("task__title").value,
        taskDescription: document.getElementById("task__description").value,
        taskLocation: document.getElementById("task__location").value
    };
    
    document.querySelector(".task__container").insertAdjacentHTML("beforeend", generateNewCard(taskData));
    globalStore.push(taskData);

    // localStorage.setItem("my_taskify", globalStore); - Stores data in Object -> Object format which is not supported
    localStorage.setItem("my_taskify", JSON.stringify({cards: globalStore})); // Stores data in Key - Value pairs
};