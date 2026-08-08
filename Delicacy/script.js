// Per butonin back to top
const topBtn = document.getElementById("topBtn");
window.onscroll = function () {
    if (document.documentElement.scrollTop > 300) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

};

topBtn.addEventListener("click", function () {
    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

// Mobile Menu Toggle

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".mobile-overlay");
const icon = menuToggle ? menuToggle.querySelector("i") : null;

if (menuToggle && mobileMenu && overlay) {

    

    menuToggle.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");
        overlay.classList.toggle("active");

        if (mobileMenu.classList.contains("active")) {
            icon.classList.replace("fa-bars", "fa-xmark");
        } else {
            icon.classList.replace("fa-xmark", "fa-bars");
        }

    });

    overlay.addEventListener("click", () => {

        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");
        icon.classList.replace("fa-xmark", "fa-bars");

    });

}

// Recipe Modal

let favoriteRecipes =
    JSON.parse(localStorage.getItem("favoriteRecipes")) || [];

const recipeFavoriteBtn =
    document.querySelector(".modal-favorite");


const modal = document.getElementById("recipeModal");

if (modal) {

    const modalTitle = document.getElementById("modal-title");
    const modalImage = document.getElementById("modal-image");
    const modalDescription = document.getElementById("modal-description");
    const modalIngredients = document.getElementById("modal-ingredients");

    const modalCategory = document.getElementById("modal-category");
    const modalDifficulty = document.getElementById("modal-difficulty");
    const modalTime = document.getElementById("modal-time");
    const modalCalories = document.getElementById("modal-calories");

    const closeModal = document.querySelector(".close-modal");
    document.addEventListener("click", function (e) {


        const button = e.target.closest(".view-btn");

        if (!button) return;

        e.preventDefault();

        const card = button.closest(".recipes-item, .recipe-card");

        if (!card) return;

        modalImage.src = card.querySelector("img").src;
        modalTitle.textContent = card.querySelector("h3").textContent;
        modalDescription.textContent = card.querySelector("p").textContent;

        modalCategory.textContent = "Category: " + card.dataset.category;
        modalDifficulty.textContent = "Difficulty: " + card.dataset.difficulty;
        modalTime.textContent = "Time: " + card.dataset.time;
        modalCalories.textContent = "Calories: " + card.dataset.calories;

        modalIngredients.innerHTML = "";

        if (card.dataset.ingredients) {

            card.dataset.ingredients.split(",").forEach(item => {

                const li = document.createElement("li");
                li.textContent = item.trim();
                modalIngredients.appendChild(li);

            });

        }

        const recipeData = {
            id: card.dataset.id,
            title: card.querySelector("h3").textContent,
            image: card.querySelector("img").src,
            description: card.querySelector("p").textContent,
            category: card.dataset.category,
            difficulty: card.dataset.difficulty,
            time: card.dataset.time,
            calories: card.dataset.calories,
            ingredients: card.dataset.ingredients
        };

        localStorage.setItem(
            "selectedRecipe",
            JSON.stringify(recipeData)
        );

        favoriteRecipes =
            JSON.parse(localStorage.getItem("favoriteRecipes")) || [];

        recipeFavoriteBtn.innerHTML =
            favoriteRecipes.includes(recipeData.id)
                ? '<i class="fa-solid fa-heart"></i>'
                : '<i class="fa-regular fa-heart"></i>';

        modal.classList.add("show");


        document.body.style.overflow = "hidden";

    });
    if (closeModal) {

        closeModal.addEventListener("click", function () {

            modal.classList.remove("show");
            document.body.style.overflow = "auto";

        });

    }

}

if (recipeFavoriteBtn) {

    recipeFavoriteBtn.addEventListener("click", function () {

        const recipe =
            JSON.parse(localStorage.getItem("selectedRecipe"));

        let favoriteRecipes =
            JSON.parse(localStorage.getItem("favoriteRecipes")) || [];

        const exists =
            favoriteRecipes.includes(recipe.id);

        if (exists) {

            favoriteRecipes =
                favoriteRecipes.filter(id => id !== recipe.id);

        } else {

            favoriteRecipes.push(recipe.id);

        }

        localStorage.setItem(
            "favoriteRecipes",
            JSON.stringify(favoriteRecipes)
        );

        updateNavbarCounts();

        recipeFavoriteBtn.innerHTML =
            exists
                ? '<i class="fa-regular fa-heart"></i>'
                : '<i class="fa-solid fa-heart"></i>';

    });
}

const recipeCards =
    document.querySelectorAll(".recipes-item");

recipeCards.forEach(card => {

    const heart =
        card.querySelector(".favorite-btn");

    const recipeId =
        card.dataset.id;

    let favoriteRecipes =
        JSON.parse(localStorage.getItem("favoriteRecipes")) || [];
    if (favoriteRecipes.includes(recipeId)) {

        heart.innerHTML =
            '<i class="fa-solid fa-heart"></i>';

        heart.classList.add("active");

    } else {

        heart.innerHTML =
            '<i class="fa-regular fa-heart"></i>';

        heart.classList.remove("active");

    }

    heart.addEventListener("click", function (e) {

        e.preventDefault();
        e.stopPropagation();

        let favoriteRecipes =
            JSON.parse(localStorage.getItem("favoriteRecipes")) || [];

        if (favoriteRecipes.includes(recipeId)) {

            favoriteRecipes =
                favoriteRecipes.filter(id => id !== recipeId);

            heart.innerHTML =
                '<i class="fa-regular fa-heart"></i>';

            heart.classList.remove("active");

        }

        else {

            favoriteRecipes.push(recipeId);

            heart.innerHTML =
                '<i class="fa-solid fa-heart"></i>';

            heart.classList.add("active");
        }

        localStorage.setItem(
            "favoriteRecipes",
            JSON.stringify(favoriteRecipes)
        );

        updateNavbarCounts();

    });

});
// About Sidebar Active Link


const sections = document.querySelectorAll(".about-content section");
const navLinks = document.querySelectorAll(".about-sidebar a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

// FAQ Accordion

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const item = question.parentElement;
        const answer = item.querySelector(".faq-answer");

        if (item.classList.contains("active")) {

            answer.style.maxHeight = null;
            item.classList.remove("active");

        } else {

            answer.style.maxHeight = answer.scrollHeight + "px";
            item.classList.add("active");

        }

    });

});

// Contact Form

const questionForm = document.getElementById("questionForm");
const successMessage = document.getElementById("successMessage");

if (questionForm) {

    questionForm.addEventListener("submit", function (e) {

        e.preventDefault();

        if (!questionForm.checkValidity()) {
            questionForm.reportValidity();
            return;
        }

        successMessage.textContent = "✅ Your question has been sent successfully!";

        questionForm.reset();

        setTimeout(() => {
            successMessage.textContent = "";
        }, 6000);

    });

}

// Navbar User Info

const userDropdownMobile = document.getElementById("userDropdownMobile");
const userNameMobile = document.getElementById("userNameMobile");
const userEmailMobile = document.getElementById("userEmailMobile");
const logoutBtnMobile = document.getElementById("logoutBtnMobile");
const openAuthMobile = document.getElementById("openAuthMobile");
const openAuthBtn = document.getElementById("openAuth");
const userDropdown = document.getElementById("userDropdown");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");
function updateNavbarUser() {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {

        // Desktop
        if (openAuthBtn)
            openAuthBtn.innerHTML = '<i class="fa-solid fa-circle-user"></i>';

        if (userName)
            userName.textContent = currentUser.name;

        if (userEmail)
            userEmail.textContent = currentUser.email;

        // Mobile
        if (openAuthMobile)
            openAuthMobile.style.display = "none";

        if (userDropdownMobile)
            userDropdownMobile.classList.add("show");

        if (userNameMobile)
            userNameMobile.textContent = currentUser.name;

        if (userEmailMobile)
            userEmailMobile.textContent = currentUser.email;

    } else {

        // Desktop
        if (openAuthBtn)
            openAuthBtn.textContent = "Sign Up";

        if (userDropdown)
            userDropdown.classList.remove("show");

        if (userName)
            userName.textContent = "";

        if (userEmail)
            userEmail.textContent = "";

        // Mobile
        if (openAuthMobile) {
            openAuthMobile.style.display = "block";
            openAuthMobile.textContent = "Login";
        }

        if (userDropdownMobile)
            userDropdownMobile.classList.remove("show");

        if (userNameMobile)
            userNameMobile.textContent = "";

        if (userEmailMobile)
            userEmailMobile.textContent = "";
    }
}


updateNavbarUser();

//LOGIN MODAL

const authModal = document.getElementById("authModal");

const closeAuth = document.getElementById("closeAuth");



if (openAuthBtn) {

    openAuthBtn.addEventListener("click", function (e) {

        e.preventDefault();

        const currentUser =
            JSON.parse(localStorage.getItem("currentUser"));

        if (currentUser) {

            userDropdown.classList.toggle("show");

        } else {

            if (currentUser) {

                userDropdown.classList.toggle("show");

            } else if (authModal) {

                authModal.classList.add("show");
                document.body.style.overflow = "hidden";

            }
        }

    });

}

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        localStorage.removeItem("currentUser");

        userDropdown.classList.remove("show");

        updateNavbarUser();

    });

}


if (logoutBtnMobile) {

    logoutBtnMobile.addEventListener("click", function () {

        localStorage.removeItem("currentUser");

        if (userDropdownMobile)
            userDropdownMobile.classList.remove("show");

        updateNavbarUser();

    });

}


if (closeAuth && authModal) {

    closeAuth.addEventListener("click", function () {

        authModal.classList.remove("show");
        document.body.style.overflow = "auto";

        loginForm.reset();
        signupForm.reset();

        loginMessage.textContent = "";
        signupMessage.textContent = "";

         if (icon) {
        icon.classList.replace("fa-xmark", "fa-bars");
    }

    });



}

window.addEventListener("click", function (e) {

    if (e.target === authModal) {

        authModal.classList.remove("show");
        document.body.style.overflow = "auto";

        loginForm.reset();
        signupForm.reset();

        loginMessage.textContent = "";
        signupMessage.textContent = "";

        if (icon) {
    icon.classList.replace("fa-xmark", "fa-bars");
}

    }

});

// LOGIN / SIGNUP TABS

const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

if (loginTab && signupTab && loginForm && signupForm) {

    signupTab.addEventListener("click", function () {

        signupTab.classList.add("active");
        loginTab.classList.remove("active");

        signupForm.classList.remove("hidden");
        loginForm.classList.add("hidden");

    });

    loginTab.addEventListener("click", function () {

        loginTab.classList.add("active");
        signupTab.classList.remove("active");

        loginForm.classList.remove("hidden");
        signupForm.classList.add("hidden");

    });

}

//  SIGN UP 


const signupMessage = document.getElementById("signupMessage");
const loginMessage = document.getElementById("loginMessage");

if (signupForm) {

    signupForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value;
        const confirm = document.getElementById("signupConfirm").value;

        // Passwords don't match
        if (password !== confirm) {

            signupMessage.style.color = "red";
            signupMessage.textContent = "Passwords do not match!";
            return;

        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Email already exists
        const exists = users.find(user => user.email === email);

        if (exists) {

            signupMessage.style.color = "red";
            signupMessage.textContent = "This email already exists!";
            return;

        }

        users.push({
            name,
            email,
            password
        });

        localStorage.setItem("users", JSON.stringify(users));

        localStorage.setItem("currentUser", JSON.stringify({

            name,

            email

        }));

        signupMessage.style.color = "green";
        signupMessage.textContent = "Account created successfully!";

        signupForm.reset();

        setTimeout(() => {

            signupMessage.textContent = "";

            authModal.classList.remove("show");

            document.body.style.overflow = "auto";

            updateNavbarUser();

            loginTab.click();

        }, 1500);



    });

}

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(u => u.email === email);

        if (!user) {

            loginMessage.style.color = "red";
            loginMessage.textContent = "No account found.";

            return;

        }

        if (user.password !== password) {

            loginMessage.style.color = "red";
            loginMessage.textContent = "Incorrect password.";

            return;

        }

        localStorage.setItem("currentUser", JSON.stringify({

            name: user.name,
            email: user.email

        }));

        loginMessage.style.color = "green";
        loginMessage.textContent = "Login successful!";

        loginForm.reset();

        setTimeout(() => {

            loginMessage.textContent = "";

            loginForm.reset();

            authModal.classList.remove("show");

            document.body.style.overflow = "auto";

            updateNavbarUser();

        }, 1000);

    });

}

document.addEventListener("click", function (e) {

    if (
        userDropdown &&
        openAuthBtn &&
        !userDropdown.contains(e.target) &&
        !openAuthBtn.contains(e.target)
    ) {

        userDropdown.classList.remove("show");

    }

});

if (openAuthMobile) {

    openAuthMobile.addEventListener("click", function (e) {

        e.preventDefault();

        const currentUser =
            JSON.parse(localStorage.getItem("currentUser"));

        if (currentUser) {

            userDropdownMobile.classList.toggle("show");

        } else {

            authModal.classList.add("show");
            document.body.style.overflow = "hidden";

            loginTab.click();

        }

        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");

    });

}

//Recipes database

const recipesDatabase = {
    "avocado-toast": {
        description: "Avocado Toast is a healthy and nutritious breakfast made with creamy avocado, toasted whole-grain bread, fresh vegetables, and a perfectly cooked egg. It is rich in healthy fats, protein, and fiber, making it an excellent choice for a balanced and energetic start to your day.",
        ingredients: ["2 slices Whole Grain Bread",
            "1 ripe Avocado",
            "1 Boiled Egg",
            "5 Cherry Tomatoes",
            "1 tbsp Olive Oil",
            "Salt",
            "Black Pepper"],
        preparation: [

            "Gather all the ingredients and prepare them before starting the recipe.",

            "Toast the bread until it becomes golden brown and crispy.",

            "Mash the avocado with olive oil, salt, and black pepper.",

            "Spread the avocado evenly over the toasted bread.",

            "Add sliced boiled egg and cherry tomatoes on top.",

            "Serve immediately while the toast is still warm."

        ],
        nutrition: {

            calories: "320 kcal",

            protein: "15 g",

            carbs: "28 g",

            fat: "18 g",

            fiber: "8 g"
        },
        products: [1, 2, 3]

    },

    "chicken-salad": {
        description: "Healthy Chicken Salad is a fresh and protein-rich meal prepared with grilled chicken breast, crisp lettuce, juicy tomatoes, cucumber, and a light olive oil dressing. It is perfect for a nutritious lunch that keeps you full and energized.",

        ingredients: [
            "1 Chicken Breast",
            "1 cup Lettuce",
            "1 Tomato",
            "1/2 Cucumber",
            "1 tbsp Olive Oil",
            "Salt",
            "Black Pepper"
        ],

        preparation: [
            "Season the chicken breast with salt and black pepper.",
            "Grill the chicken until fully cooked and slice it into strips.",
            "Wash and chop the lettuce, tomato, and cucumber.",
            "Combine all vegetables in a large bowl.",
            "Add the sliced chicken on top.",
            "Drizzle with olive oil and serve immediately."
        ],

        nutrition: {
            calories: "350 kcal",
            protein: "34 g",
            carbs: "10 g",
            fat: "18 g",
            fiber: "4 g"
        },

        products: [11, 25, 39, 13]
    },

    "berry-smoothie": {
        description: "Berry Smoothie is a refreshing breakfast drink made with strawberries, blueberries, banana, creamy Greek yogurt, and a touch of honey. It is packed with vitamins, antioxidants, and protein.",

        ingredients: [
            "1 Banana",
            "1/2 cup Strawberries",
            "1/2 cup Blueberries",
            "1 Greek Yogurt",
            "1 tbsp Honey",
            "Ice Cubes"
        ],

        preparation: [
            "Wash all fresh fruit.",
            "Slice the banana into pieces.",
            "Add banana, strawberries, blueberries, yogurt, and honey to a blender.",
            "Blend until smooth and creamy.",
            "Add ice cubes if desired.",
            "Serve chilled."
        ],

        nutrition: {
            calories: "220 kcal",
            protein: "11 g",
            carbs: "35 g",
            fat: "5 g",
            fiber: "6 g"
        },

        products: [38, 8, 6, 21, 41]
    },

    "greek-yogurt-parfait": {
        description: "Greek Yogurt Parfait is a delicious breakfast layered with creamy Greek yogurt, crunchy granola, fresh berries, and natural honey. It is rich in protein and perfect for a healthy start to the day.",

        ingredients: [
            "1 Greek Yogurt",
            "1/2 cup Granola",
            "1/2 cup Strawberries",
            "1/2 cup Blueberries",
            "1 tbsp Honey"
        ],

        preparation: [
            "Add a layer of Greek yogurt into a serving glass.",
            "Sprinkle granola over the yogurt.",
            "Add fresh strawberries and blueberries.",
            "Repeat the layers until the glass is full.",
            "Finish with a drizzle of honey.",
            "Serve immediately."
        ],

        nutrition: {
            calories: "280 kcal",
            protein: "18 g",
            carbs: "29 g",
            fat: "9 g",
            fiber: "5 g"
        },

        products: [6, 19, 38, 8, 21]
    },

    "spinach-omelette": {
        description: "Spinach Omelette is a fluffy and protein-packed breakfast prepared with fresh eggs, spinach, cheese, and olive oil. It is simple to prepare and provides a balanced combination of protein and healthy fats.",

        ingredients: [
            "2 Eggs",
            "1 cup Spinach",
            "50 g Cheese",
            "1 tbsp Olive Oil",
            "Salt",
            "Black Pepper"
        ],

        preparation: [
            "Beat the eggs in a bowl.",
            "Heat olive oil in a non-stick pan.",
            "Cook the spinach for 2 minutes.",
            "Pour the beaten eggs into the pan.",
            "Add grated cheese on top.",
            "Fold the omelette and cook until golden."
        ],

        nutrition: {
            calories: "300 kcal",
            protein: "22 g",
            carbs: "5 g",
            fat: "22 g",
            fiber: "3 g"
        },

        products: [2, 4]
    },

    "quinoa-buddha-bowl": {
        description: "Quinoa Buddha Bowl is a colorful and nutritious meal made with fluffy quinoa, creamy avocado, fresh broccoli, and seasonal vegetables. It is rich in protein, fiber, and healthy fats, making it a satisfying lunch.",

        ingredients: [
            "1 cup Quinoa",
            "1 Avocado",
            "1 cup Broccoli",
            "1 tbsp Olive Oil",
            "Salt",
            "Black Pepper"
        ],

        preparation: [
            "Cook the quinoa according to the package instructions.",
            "Steam the broccoli until tender.",
            "Slice the avocado into thin pieces.",
            "Arrange quinoa in a serving bowl.",
            "Top with broccoli and avocado.",
            "Drizzle with olive oil, season, and serve."
        ],

        nutrition: {
            calories: "420 kcal",
            protein: "16 g",
            carbs: "45 g",
            fat: "18 g",
            fiber: "11 g"
        },

        products: [7, 1, 9]
    },

    "mediterranean-salad": {
        description: "Mediterranean Salad is a refreshing combination of cucumbers, tomatoes, olives, feta cheese, and olive oil. It is light, flavorful, and perfect as a healthy lunch or side dish.",

        ingredients: [
            "1 Cucumber",
            "2 Tomatoes",
            "100 g Feta Cheese",
            "Black Olives",
            "1 tbsp Olive Oil",
            "Salt",
            "Oregano"
        ],

        preparation: [
            "Wash and chop the cucumber and tomatoes.",
            "Cut the feta cheese into cubes.",
            "Place all ingredients in a salad bowl.",
            "Add olives.",
            "Drizzle with olive oil.",
            "Season with oregano and serve."
        ],

        nutrition: {
            calories: "280 kcal",
            protein: "9 g",
            carbs: "13 g",
            fat: "20 g",
            fiber: "4 g"
        },

        products: [13, 39, 14]
    },

    "chickpea-salad": {
        description: "Chickpea Salad is a protein-rich vegan meal made with chickpeas, tomatoes, cucumber, parsley, and olive oil. It is fresh, nutritious, and easy to prepare.",

        ingredients: [
            "1 cup Chickpeas",
            "1 Tomato",
            "1 Cucumber",
            "Fresh Parsley",
            "1 tbsp Olive Oil",
            "Salt",
            "Black Pepper"
        ],

        preparation: [
            "Drain and rinse the chickpeas.",
            "Dice the tomato and cucumber.",
            "Chop the parsley.",
            "Combine everything in a bowl.",
            "Add olive oil and seasoning.",
            "Mix well and serve."
        ],

        nutrition: {
            calories: "330 kcal",
            protein: "14 g",
            carbs: "38 g",
            fat: "12 g",
            fiber: "10 g"
        },

        products: [12, 39, 13, 32]
    },

    "grilled-salmon": {
        description: "Grilled Salmon is a healthy dinner featuring tender salmon fillet served with steamed broccoli and fresh lemon. It is rich in omega-3 fatty acids and high-quality protein.",

        ingredients: [
            "1 Salmon Fillet",
            "1 cup Broccoli",
            "1 Lemon",
            "1 tbsp Olive Oil",
            "Salt",
            "Black Pepper"
        ],

        preparation: [
            "Season the salmon with salt and pepper.",
            "Brush with olive oil.",
            "Grill for about 5–6 minutes on each side.",
            "Steam the broccoli until tender.",
            "Serve with broccoli and fresh lemon slices.",
            "Enjoy while warm."
        ],

        nutrition: {
            calories: "460 kcal",
            protein: "38 g",
            carbs: "8 g",
            fat: "30 g",
            fiber: "4 g"
        },

        products: [36, 9, 24]
    },

    "chicken-broccoli": {
        description: "Chicken Broccoli is a healthy low-carb dinner made with juicy chicken breast, broccoli, garlic, and olive oil. It is simple, delicious, and packed with protein.",

        ingredients: [
            "1 Chicken Breast",
            "1 cup Broccoli",
            "2 Garlic Cloves",
            "1 tbsp Olive Oil",
            "Salt",
            "Black Pepper"
        ],

        preparation: [
            "Season the chicken breast.",
            "Cook the chicken until golden and fully cooked.",
            "Steam the broccoli.",
            "Sauté garlic in olive oil.",
            "Mix broccoli with garlic.",
            "Serve together with the chicken."
        ],

        nutrition: {
            calories: "390 kcal",
            protein: "37 g",
            carbs: "10 g",
            fat: "19 g",
            fiber: "5 g"
        },

        products: [11, 9, 17]
    },

    "stuffed-bell-peppers": {
        description: "Stuffed Bell Peppers are colorful bell peppers filled with lean ground turkey, onions, tomatoes, and herbs. They are baked until tender, creating a healthy, protein-rich dinner that is both satisfying and flavorful.",

        ingredients: [
            "2 Bell Peppers",
            "250 g Ground Turkey",
            "1 Onion",
            "2 Tomatoes",
            "1 tbsp Olive Oil",
            "Salt",
            "Black Pepper"
        ],

        preparation: [
            "Preheat the oven to 190°C.",
            "Cut the tops off the bell peppers and remove the seeds.",
            "Cook the onion in olive oil until soft.",
            "Add the ground turkey and cook until browned.",
            "Stir in chopped tomatoes and seasonings.",
            "Fill the peppers with the mixture and bake for 30 minutes."
        ],

        nutrition: {
            calories: "410 kcal",
            protein: "34 g",
            carbs: "16 g",
            fat: "22 g",
            fiber: "5 g"
        },

        products: [37, 40, 29, 39]
    },

    "turkey-meatballs": {
        description: "Turkey Meatballs are juicy, oven-baked meatballs made with lean turkey, eggs, garlic, and parsley. They are a healthier alternative to traditional meatballs and are perfect with vegetables or whole grains.",

        ingredients: [
            "300 g Turkey",
            "1 Egg",
            "2 Garlic Cloves",
            "Fresh Parsley",
            "Salt",
            "Black Pepper"
        ],

        preparation: [
            "Combine turkey, egg, garlic, parsley, salt, and pepper in a bowl.",
            "Mix until evenly combined.",
            "Shape into small meatballs.",
            "Arrange on a baking tray.",
            "Bake at 190°C for 25 minutes.",
            "Serve warm with your favorite side dish."
        ],

        nutrition: {
            calories: "430 kcal",
            protein: "39 g",
            carbs: "5 g",
            fat: "27 g",
            fiber: "1 g"
        },

        products: [40, 2, 17, 32]
    },

    "fruit-salad": {
        description: "Fruit Salad is a refreshing dessert made with a colorful mix of fresh seasonal fruits. It is naturally sweet, packed with vitamins, and perfect as a healthy snack or light dessert.",

        ingredients: [
            "1 cup Strawberries",
            "1 Banana",
            "2 Kiwis",
            "1 cup Grapes",
            "1 Orange",
            "Fresh Mint"
        ],

        preparation: [
            "Wash all the fruit thoroughly.",
            "Peel and slice the banana and kiwi.",
            "Cut the strawberries and orange into bite-sized pieces.",
            "Combine all fruit in a large bowl.",
            "Mix gently.",
            "Serve chilled."
        ],

        nutrition: {
            calories: "180 kcal",
            protein: "2 g",
            carbs: "42 g",
            fat: "1 g",
            fiber: "6 g"
        },

        products: [38, 22, 20, 30, 41]
    },

    "banana-nice-cream": {
        description: "Banana Nice Cream is a creamy frozen dessert made with ripe bananas and vanilla. It is naturally sweet, dairy-free, and a healthy alternative to traditional ice cream.",

        ingredients: [
            "2 Frozen Bananas",
            "1 tsp Vanilla Extract"
        ],

        preparation: [
            "Slice the bananas before freezing.",
            "Freeze for at least 4 hours.",
            "Blend the frozen bananas until smooth.",
            "Add vanilla extract.",
            "Blend again until creamy.",
            "Serve immediately."
        ],

        nutrition: {
            calories: "210 kcal",
            protein: "2 g",
            carbs: "50 g",
            fat: "1 g",
            fiber: "5 g"
        },

        products: [41]
    },

    "chia-pudding": {
        description: "Chia Pudding is a healthy breakfast prepared with chia seeds, almond milk, honey, and fresh berries. It is rich in fiber, healthy fats, and antioxidants while requiring almost no cooking.",

        ingredients: [
            "3 tbsp Chia Seeds",
            "1 cup Almond Milk",
            "1 tbsp Honey",
            "Mixed Berries"
        ],

        preparation: [
            "Mix chia seeds with almond milk.",
            "Add honey and stir well.",
            "Refrigerate overnight.",
            "Stir again before serving.",
            "Top with fresh berries.",
            "Enjoy chilled."
        ],

        nutrition: {
            calories: "250 kcal",
            protein: "7 g",
            carbs: "24 g",
            fat: "13 g",
            fiber: "11 g"
        },

        products: [16, 35, 21, 28]
    },

    "vegan-lentil-curry": {
        description: "Vegan Lentil Curry is a warm and comforting dish made with red lentils, onion, garlic, coconut milk, and aromatic spices. It is rich in plant-based protein, fiber, and flavor, making it a perfect healthy dinner.",

        ingredients: [
            "1 cup Lentils",
            "1 Onion",
            "2 Garlic Cloves",
            "1 Coconut Milk",
            "1 tbsp Curry Powder",
            "1 tbsp Olive Oil",
            "Salt",
            "Black Pepper"
        ],

        preparation: [
            "Heat olive oil in a saucepan.",
            "Cook the onion and garlic until softened.",
            "Add curry powder and stir for one minute.",
            "Add the lentils and coconut milk.",
            "Simmer for 25 minutes until the lentils are tender.",
            "Season to taste and serve warm."
        ],

        nutrition: {
            calories: "440 kcal",
            protein: "19 g",
            carbs: "47 g",
            fat: "20 g",
            fiber: "14 g"
        },

        products: [26, 29, 17, 33]
    },

    "zucchini-noodles": {
        description: "Zucchini Noodles are a fresh low-carb alternative to pasta, tossed with garlic, cherry tomatoes, Parmesan cheese, and herbs. This light meal is perfect for a healthy dinner.",

        ingredients: [
            "2 Zucchini",
            "1 cup Cherry Tomatoes",
            "2 Garlic Cloves",
            "50 g Parmesan Cheese",
            "1 tbsp Olive Oil",
            "Salt",
            "Black Pepper"
        ],

        preparation: [
            "Spiralize the zucchini into noodles.",
            "Heat olive oil in a pan.",
            "Cook garlic until fragrant.",
            "Add cherry tomatoes and cook for a few minutes.",
            "Stir in the zucchini noodles.",
            "Top with grated Parmesan and serve immediately."
        ],

        nutrition: {
            calories: "260 kcal",
            protein: "11 g",
            carbs: "14 g",
            fat: "18 g",
            fiber: "5 g"
        },

        products: [23, 3, 17, 31]
    },

    "cottage-cheese-bowl": {
        description: "Cottage Cheese Bowl is a protein-rich breakfast topped with banana, almonds, and honey. It is creamy, naturally sweet, and provides lasting energy throughout the morning.",

        ingredients: [
            "1 Cottage Cheese",
            "1 Banana",
            "30 g Almonds",
            "1 tbsp Honey"
        ],

        preparation: [
            "Place the cottage cheese in a serving bowl.",
            "Slice the banana.",
            "Sprinkle almonds over the top.",
            "Drizzle with honey.",
            "Mix lightly if desired.",
            "Serve immediately."
        ],

        nutrition: {
            calories: "310 kcal",
            protein: "23 g",
            carbs: "25 g",
            fat: "14 g",
            fiber: "4 g"
        },

        products: [15, 5, 21]
    },

    "cauliflower-rice-bowl": {
        description: "Cauliflower Rice Bowl is a healthy gluten-free meal prepared with grated cauliflower, broccoli, carrots, and chickpeas. It is colorful, filling, and packed with vegetables.",

        ingredients: [
            "1 Cauliflower",
            "1 cup Broccoli",
            "2 Carrots",
            "1 cup Chickpeas",
            "1 tbsp Olive Oil",
            "Salt",
            "Black Pepper"
        ],

        preparation: [
            "Grate the cauliflower into rice-sized pieces.",
            "Steam the broccoli and carrots.",
            "Heat olive oil in a large pan.",
            "Cook the cauliflower rice for 5 minutes.",
            "Add broccoli, carrots, and chickpeas.",
            "Season and serve warm."
        ],

        nutrition: {
            calories: "340 kcal",
            protein: "14 g",
            carbs: "36 g",
            fat: "13 g",
            fiber: "11 g"
        },

        products: [27, 9, 10, 12]
    },

    "healthy-salad": {
        description: "Healthy Salad is a refreshing combination of lettuce, tomatoes, cucumber, avocado, and olive oil. It is light, nutritious, and ideal for a quick healthy lunch or side dish.",

        ingredients: [
            "1 cup Lettuce",
            "2 Tomatoes",
            "1 Cucumber",
            "1 Avocado",
            "1 tbsp Olive Oil",
            "Salt",
            "Black Pepper"
        ],

        preparation: [
            "Wash all the vegetables thoroughly.",
            "Chop the lettuce, tomatoes, cucumber, and avocado.",
            "Place everything into a large bowl.",
            "Drizzle with olive oil.",
            "Season with salt and black pepper.",
            "Toss gently and serve fresh."
        ],

        nutrition: {
            calories: "240 kcal",
            protein: "4 g",
            carbs: "18 g",
            fat: "17 g",
            fiber: "8 g"
        },

        products: [25, 39, 13, 1]
    },


};


// Products card 
const products = [

    {
        id: 1,
        name: "Avocado",
        category: "Fruits",
        description: "Fresh organic avocado rich in healthy fats.",
        price: "€10 ",
        image: "images/avocados.jpg",
        unit: "kg"
    },

    {
        id: 2,
        name: "Eggs",
        category: "Dairy",
        description: "Farm fresh eggs from local farms.",
        price: "€2.50 ",
        image: "images/eggs.jpg",
        unit: "pcs"
    },

    {
        id: 3,
        name: "Cherry Tomatoes",
        category: "Vegetables",
        description: "Sweet and juicy cherry tomatoes.",
        price: "€5 ",
        image: "images/tomatines.jpg",
        unit: "kg"
    },

    {
        id: 4,
        name: "Spinach",
        category: "Vegetables",
        description: "Fresh organic spinach, perfect for salads and cooking.",
        price: "€2.5",
        image: "images/spinach.jpg",
        unit: "kg"
    },

    {
        id: 5,
        name: "Almonds",
        category: "Nuts",
        description: "Crunchy and nutritious almonds, great for snacking.",
        price: "€15",
        image: "images/almonds.jpg",
        unit: "kg"

    },

    {
        id: 6,
        name: "Greek Yogurt",
        category: "Dairy",
        description: "Creamy Greek yogurt, rich in protein and probiotics.",
        price: "€3",
        image: "images/kosgrek.jpg",
        unit: "pcs"
    },

    {
        id: 7,
        name: "Quinoa",
        category: "Grains",
        description: "High-protein quinoa, perfect for healthy meals.",
        price: "€8 ",
        image: "images/quino.jpg",
        unit: "kg"
    },

    {
        id: 8,
        name: "Blueberries",
        category: "Fruits",
        description: "Fresh blueberries, packed with antioxidants.",
        price: "€12 ",
        image: "images/blueberry.jpg",
        unit: "kg"
    },

    {
        id: 9,
        name: "Broccoli",
        category: "Vegetables",
        description: "Fresh organic broccoli, rich in vitamins and minerals.",
        price: "€4 ",
        image: "images/brokoli.jpg",
        unit: "kg"
    },

    {
        id: 10,
        name: "Carrots",
        category: "Vegetables",
        description: "Fresh organic carrots, perfect for snacking and cooking.",
        price: "€3 ",
        image: "images/carrot.jpg",
        unit: "kg"
    },

    {
        id: 11,
        name: "Chicken breast",
        category: "Meat",
        description: "Lean chicken breast, perfect for healthy meals.",
        price: "€7 ",
        image: "images/cikenbreast.jpg",
        unit: "pcs"
    },

    {
        id: 12,
        name: "Chickpeas",
        category: "Legumes",
        description: "Nutritious and versatile chickpeas, great for salads and stews.",
        price: "€4 ",
        image: "images/cikpea.jpg",
        unit: "kg"
    },

    {
        id: 13,
        name: "Cucumbers",
        category: "Vegetables",
        description: "Fresh organic cucumbers, perfect for salads and snacking.",
        price: "€2",
        image: "images/cucumber.jpg",
        unit: "kg"
    },

    {
        id: 14,
        name: "Feta Cheese",
        category: "Dairy",
        description: "Authentic Greek feta cheese, perfect for salads and cooking.",
        price: "€6 ",
        image: "images/djath.jpg",
        unit: "kg"
    },

    {
        id: 15,
        name: "Cottage Cheese",
        category: "Dairy",
        description: "Creamy cottage cheese, rich in protein and calcium.",
        price: "€5",
        image: "images/djathcottage.jpg",
        unit: "pcs"
    },

    {
        id: 16,
        name: "Chia seeds",
        category: "Seeds",
        description: "Nutritious chia seeds, great for smoothies and baking.",
        price: "€6 ",
        image: "images/faracia.jpg",
        unit: "kg"
    },

    {
        id: 17,
        name: "Garlic",
        category: "Vegetables",
        description: "Fresh organic garlic, perfect for cooking and seasoning.",
        price: "€3",
        image: "images/garlic.jpg",
        unit: "kg"
    },

    {
        id: 18,
        name: "Grain bread",
        category: "Bakery",
        description: "Freshly baked whole grain bread, perfect for sandwiches and toast.",
        price: "€2",
        image: "images/grainbread.jpg",
        unit: "loaf"
    },

    {
        id: 19,
        name: "Granola",
        category: "Oats",
        description: "Healthy granola, perfect for breakfast and snacking.",
        price: "€5",
        image: "images/granola.jpg",
        unit: "bag"
    },

    {
        id: 20,
        name: "Grapes",
        category: "Fruits",
        description: "Fresh organic grapes, sweet and juicy.",
        price: "€4 ",
        image: "images/grapes.jpg",
        unit: "kg"
    },

    {
        id: 21,
        name: "Honey",
        category: "Sweeteners",
        description: "Pure natural honey, perfect for sweetening and cooking.",
        price: "€25",
        image: "images/honey.jpg",
        unit: "jar"
    },

    {
        id: 22,
        name: "Kiwi",
        category: "Fruits",
        description: "Fresh organic kiwi, rich in vitamin C and antioxidants.",
        price: "€6 ",
        image: "images/kivi.jpg",
        unit: "kg"
    },

    {
        id: 23,
        name: "Zucchini",
        category: "Vegetables",
        description: "Fresh organic zucchini, perfect for grilling and cooking.",
        price: "€3 ",
        image: "images/kungull.jpg",
        unit: "kg"
    },

    {
        id: 24,
        name: "Lemons",
        category: "Fruits",
        description: "Fresh organic lemons, perfect for cooking and beverages.",
        price: "€2.5 ",
        image: "images/lemon.jpg",
        unit: "kg"
    },

    {
        id: 25,
        name: "Lettuce",
        category: "Vegetables",
        description: "Fresh organic lettuce, perfect for salads and sandwiches.",
        price: "€5 ",
        image: "images/lettuce.jpg",
        unit: "kg"
    },

    {
        id: 26,
        name: "Lentils",
        category: "Legumes",
        description: "Nutritious lentils, great for soups and stews.",
        price: "€4 ",
        image: "images/lentil.jpg",
        unit: "kg"
    },

    {
        id: 27,
        name: "Cauliflower",
        category: "Vegetables",
        description: "Fresh organic cauliflower, perfect for roasting and cooking.",
        price: "€3 ",
        image: "images/lulelaker.jpg",
        unit: "kg"
    },

    {
        id: 28,
        name: "Berries",
        category: "Fruits",
        description: "Fresh organic berries, packed with antioxidants.",
        price: "€12 ",
        image: "images/mixberries.jpg",
        unit: "kg"
    },

    {
        id: 29,
        name: "Onions",
        category: "Vegetables",
        description: "Fresh organic onions, perfect for cooking and seasoning.",
        price: "€2 ",
        image: "images/onion.jpg",
        unit: "kg"
    },

    {
        id: 30,
        name: "Oranges",
        category: "Fruits",
        description: "Fresh organic oranges, rich in vitamin C.",
        price: "€3 ",
        image: "images/orange.jpg",
        unit: "kg"
    },

    {
        id: 31,
        name: "Parmesan Cheese",
        category: "Dairy",
        description: "Authentic Parmesan cheese, perfect for grating and cooking.",
        price: "€20",
        image: "images/parmesan.jpg",
        unit: "pcs"
    },

    {
        id: 32,
        name: "Parsley",
        category: "Herbs",
        description: "Fresh organic parsley, perfect for garnishing and cooking.",
        price: "€2",
        image: "images/parsley.jpg",
        unit: "bunch"
    },

    {
        id: 33,
        name: "Coconut Milk",
        category: "Beverages",
        description: "Creamy coconut milk, perfect for cooking and beverages.",
        price: "€3",
        image: "images/qumsharrkokosi.jpg",
        unit: "pcs"
    },

    {
        id: 34,
        name: "Raspberries",
        category: "Fruits",
        description: "Fresh organic raspberries, sweet and juicy.",
        price: "€15 ",
        image: "images/rasberri.jpg",
        unit: "kg"
    },

    {
        id: 35,
        name: "Almond Milk",
        category: "Beverages",
        description: "Nutritious almond milk, perfect for drinking and cooking.",
        price: "€4",
        image: "images/qumshbajame.jpg",
        unit: "pcs"
    },

    {
        id: 36,
        name: "Salmon",
        category: "Fish",
        description: "Fresh organic salmon, rich in omega-3 fatty acids.",
        price: "€30",
        image: "images/salmonpacked.jpg",
        unit: "pcs"
    },

    {
        id: 37,
        name: "Bell Peppers",
        category: "Vegetables",
        description: "Fresh organic bell peppers, perfect for salads and cooking.",
        price: "€5 ",
        image: "images/spec.jpg",
        unit: "kg"
    },

    {
        id: 38,
        name: "Strawberries",
        category: "Fruits",
        description: "Fresh organic strawberries, sweet and juicy.",
        price: "€15 ",
        image: "images/strawberry.jpg",
        unit: "kg"
    },

    {
        id: 39,
        name: "Tomatoes",
        category: "Vegetables",
        description: "Fresh organic tomatoes, perfect for salads and cooking.",
        price: "€4 ",
        image: "images/tomato.jpg",
        unit: "kg"
    },

    {
        id: 40,
        name: "Turkey",
        category: "Meat",
        description: "Lean turkey meat, perfect for healthy meals.",
        price: "€20",
        image: "images/turkey.jpg",
        unit: "pcs"

    },

    {
        id: 41,
        name: "Banana",
        category: "Fruits",
        description: "Fresh organic bananas, rich in potassium and vitamins.",
        price: "€3 ",
        image: "images/banana11.jpg",
        unit: "kg"
    }
];

//recipe home info

const recipes = [

    {
        id: "avocado-toast",
        title: "Avocado Toast",
        image: "images/recipe1.jpg",
        description: "Crispy toast with avocado, tomatoes and herbs.",
        category: "Breakfast",
        difficulty: "Easy",
        time: "10 min",
        calories: "320 kcal",
        ingredients: "Chicken Breast, Lettuce, Tomato, Cucumber, Olive Oil",
        season: "Summer",
        diet: "Vegetarian"
    },

    {
        id: "healthy-salad",
        title: "Healthy Salad",
        image: "images/recipe3.jpg",
        description: "Healthy salad with fresh vegetables and olive oil.",
        category: "Lunch",
        difficulty: "Easy",
        time: "20 min",
        calories: "280 kcal",
        ingredients: "Lettuce, Tomato, Cucumber, Avocado, Olive Oil",
        season: "Summer",
        diet: "Vegan"
    },

    {
        id: "berry-smoothie",
        title: "Berry Smoothie",
        image: "images/recipe2.jpg",
        description: "Fresh smoothie full of vitamins and antioxidants.",
        category: "Breakfast",
        difficulty: "Easy",
        time: "5 min",
        calories: "220 kcal",
        ingredients: "Strawberries, Blueberries, Banana, Greek Yogurt, Honey",
        season: "Summer",
        diet: "Breakfast"
    },

    {
        id: "chicken-salad",
        title: "Chicken Salad",
        image: "images/chickensalda.jpg",
        description: "Grilled chicken with fresh vegetables and dressing.",
        category: "Lunch",
        difficulty: "Easy",
        time: "15-30 min",
        calories: "350 kcal",
        ingredients: "Chicken Breast, Lettuce, Tomato, Cucumber, Olive Oil",
        season: "Summer",
        diet: "High-Protein"

    },

    {
        id: "greek-yogurt-parfait",
        title: "Greek Yogurt Parfait",
        image: "images/greekjogurt.jpg",
        description: "A layered dessert with Greek yogurt, fresh berries, and granola.",
        category: "Breakfast",
        difficulty: "Easy",
        time: "Under 15 min",
        calories: "280 kcal",
        ingredients: "Greek Yogurt, Granola, Strawberries, Blueberries, Honey",
        season: "Summer",
        diet: "High-Protein"
    },

    {
        id: "spinach-omelette",
        title: "Spinach Omelette",
        image: "images/spinachomelet.jpg",
        description: "A protein-packed breakfast with fresh spinach and herbs.",
        category: "Breakfast",
        difficulty: "Easy",
        time: "15-30 min",
        calories: "300 kcal",
        ingredients: "Eggs, Spinach, Cheese, Olive Oil",
        season: "Spring",
        diet: "High-Protein"
    },

    {
        id: "quinoa-buddha-bowl",
        title: "Quinoa Buddha Bowl",
        image: "images/quinobowl.jpg",
        description: "A nutritious bowl with quinoa and colorful vegetables.",
        category: "Lunch",
        difficulty: "Medium",
        time: "15-30 min",
        calories: "420 kcal",
        ingredients: "Quinoa, Avocado, Broccoli",
        season: "Summer",
        diet: "Vegetarian"
    },

    {
        id: "mediterranean-salad",
        title: "Mediterranean Salad",
        image: "images/mixsalas.jpg",
        description: "A light and refreshing salad with cucumbers, tomatoes, olives, and feta cheese.",
        category: "Lunch",
        difficulty: "Easy",
        time: "Under 15 min",
        calories: "280 kcal",
        ingredients: "Cucumber, Tomato, Olives, Feta",
        season: "Summer",
        diet: "Mediterranean"
    },

    {
        id: "chickpea-salad",
        title: "Chickpea Salad",
        image: "images/chickpea salad.jpg",
        description: "A protein-rich salad with chickpeas and fresh vegetables.",
        category: "Lunch",
        difficulty: "Easy",
        time: "15-30 min",
        calories: "330 kcal",
        ingredients: "Chickpeas, Tomato, Cucumber, Parsley, Olive Oil",
        season: "Summer",
        diet: "Vegan"
    },

    {
        id: "grilled-salmon",
        title: "Grilled Salmon",
        image: "images/salmon.jpg",
        description: "Salmon served with steamed vegetables and lemon.",
        category: "Dinner",
        difficulty: "Medium",
        time: "30-60 min",
        calories: "460 kcal",
        ingredients: "Salmon, Broccoli, Lemon, Olive Oil",
        season: "Spring",
        diet: "High-Protein"
    },

    {
        id: "chicken-broccoli",
        title: "Chicken Broccoli",
        image: "images/broccoli.jpg",
        description: "Lean chicken breast with broccoli and garlic sauce.",
        category: "Dinner",
        difficulty: "Easy",
        time: "30-60 min",
        calories: "390 kcal",
        ingredients: "Chicken Breast, Broccoli, Garlic, Olive Oil",
        season: "Winter",
        diet: "Low-Carb"
    },

    {
        id: "stuffed-bell-peppers",
        title: "Stuffed Bell Peppers",
        image: "images/stuffed bell peppers.jpg",
        description: "Bell peppers stuffed with healthy minced turkey.",
        category: "Dinner",
        difficulty: "Medium",
        time: "30-60 min",
        calories: "410 kcal",
        ingredients: "Bell Pepper, Turkey, Tomato Sauce, Onion",
        season: "Autumn",
        diet: "High-Protein"
    },

    {
        id: "turkey-meatballs",
        title: "Turkey Meatballs",
        image: "images/meatballs.jpg",
        description: "Juicy turkey meatballs with tomato sauce.",
        category: "Dinner",
        difficulty: "Medium",
        time: "30-60 min",
        calories: "430 kcal",
        ingredients: "Turkey, Eggs, Garlic, Parsley",
        season: "Winter",
        diet: "High-Protein"
    },

    {
        id: "fruit-salad",
        title: "Fruit Salad",
        image: "images/fruit salad.jpg",
        description: "A refreshing mix of seasonal fruits with a hint of mint.",
        category: "Desserts",
        difficulty: "Easy",
        time: "Under 15 min",
        calories: "180 kcal",
        ingredients: "Strawberries, Banana, Kiwi, Grapes, Orange",
        season: "Summer",
        diet: "Gluten-Free"
    },

    {
        id: "banana-nice-cream",
        title: "Banana Nice Cream",
        image: "images/bananan.jpg",
        description: "A healthy alternative to ice cream made with frozen bananas.",
        category: "Desserts",
        difficulty: "Easy",
        time: "Under 15 min",
        calories: "210 kcal",
        ingredients: "Banana, Vanilla Extract",
        season: "Summer",
        diet: "Vegan"
    },

    {
        id: "chia-pudding",
        title: "Chia Pudding",
        image: "images/chia.jpg",
        description: "A creamy chia pudding topped with fresh berries and nuts.",
        category: "Breakfast",
        difficulty: "Easy",
        time: "Under 15 min",
        calories: "250 kcal",
        ingredients: "Chia Seeds, Almond Milk, Honey, Berries",
        season: "Summer",
        diet: "Vegan"
    },

    {
        id: "vegan-lentil-curry",
        title: "Vegan Lentil Curry",
        image: "images/vegan.jpg",
        description: "A hearty and flavorful curry made with red lentils and aromatic spices.",
        category: "Dinner",
        difficulty: "Medium",
        time: "30-60 min",
        calories: "440 kcal",
        ingredients: "Lentils, Onion, Garlic, Coconut Milk, Curry Powder",
        season: "Winter",
        diet: "Vegan"
    },

    {
        id: "zucchini-noodles",
        title: "Zucchini Noodles",
        image: "images/zucchini.jpg",
        description: "Low-carb zucchini noodles with pesto sauce.",
        category: "Dinner",
        difficulty: "Easy",
        time: "15-30 min",
        calories: "260 kcal",
        ingredients: "Zucchini, Cherry Tomatoes, Garlic, Parmesan",
        season: "Summer",
        diet: "Low-Carb"
    },

    {
        id: "cottage-cheese-bowl",
        title: "Cottage Cheese Bowl",
        image: "images/protein.jpg",
        description: "Protein-packed bowl with cottage cheese and fresh vegetables.",
        category: "Breakfast",
        difficulty: "Easy",
        time: "Under 15 min",
        calories: "310 kcal",
        ingredients: "Cottage Cheese, Banana, Almonds, Honey",
        season: "Spring",
        diet: "High-Protein"
    },

    {
        id: "cauliflower-rice-bowl",
        title: "Cauliflower Rice Bowl",
        image: "images/cauliflower.jpg",
        description: "Gluten-free rice alternative with fresh vegetables.",
        category: "Lunch",
        difficulty: "Medium",
        time: "30-60 min",
        calories: "340 kcal",
        ingredients: "Cauliflower, Broccoli, Carrots, Chickpeas",
        season: "Autumn",
        diet: "Gluten-Free"
    }

];

// Recipe Details Page

const recipe = JSON.parse(localStorage.getItem("selectedRecipe"));


if (
    recipe &&
    document.getElementById("detail-image")
) {
    const recipeInfo = recipesDatabase[recipe.id];

    document.getElementById("detail-image").src = recipe.image;
    document.getElementById("detail-title").textContent = recipe.title;
    document.getElementById("detail-description").textContent = recipe.description;
    document.getElementById("detail-category").textContent = recipe.category;
    document.getElementById("detail-time").textContent = recipe.time;
    document.getElementById("detail-difficulty").textContent = recipe.difficulty;
    document.getElementById("detail-calories").textContent = recipe.calories;
    document.getElementById("recipe-description").textContent = recipeInfo.description;

    const ingredientsList = document.getElementById("ingredients-list");

    ingredientsList.innerHTML = "";

    recipeInfo.ingredients.forEach(ingredient => {

        const li = document.createElement("li");

        li.textContent = ingredient;

        ingredientsList.appendChild(li);

    });

    const preparationList = document.getElementById("preparation-list");

    preparationList.innerHTML = "";

    recipeInfo.preparation.forEach((step, index) => {

        preparationList.innerHTML += `

        <div class="step">

            <h3>Step ${index + 1}</h3>

            <p>${step}</p>

        </div>

    `;

    });

    document.getElementById("nutrition-calories").textContent =
        recipeInfo.nutrition.calories;

    document.getElementById("nutrition-protein").textContent =
        recipeInfo.nutrition.protein;

    document.getElementById("nutrition-carbs").textContent =
        recipeInfo.nutrition.carbs;

    document.getElementById("nutrition-fat").textContent =
        recipeInfo.nutrition.fat;

    document.getElementById("nutrition-fiber").textContent =
        recipeInfo.nutrition.fiber;

    const productsContainer = document.getElementById("related-products");

    productsContainer.innerHTML = "";


    recipeInfo.products.forEach(productId => {

        const product = products.find(p => p.id === productId);

        if (!product) return;

        productsContainer.innerHTML += `

    <div class="recipe-product-card">

        <img src="${product.image}" alt="${product.name}">

        <div class="recipe-details-product-info">

            <h3>${product.name}</h3>

            <p>${product.price} / ${product.unit}</p>

            <button
                class="recipe-details-product-btn"
                data-id="${product.id}"
                data-name="${product.name}"
                data-price="${product.price}"
                data-unit="${product.unit}"
                data-image="${product.image}">

                <i class="fa-solid fa-cart-plus"></i>

                Add to Cart

            </button>

        </div>

    </div>

    `;

    });

}

// RECIPES FILTER



const searchInput = document.getElementById("searchInput");

const categoryFilters = document.querySelectorAll(".category-filter");
const ingredientFilters = document.querySelectorAll(".ingredient-filter");
const seasonFilters = document.querySelectorAll(".season-filter");
const difficultyFilters = document.querySelectorAll(".difficulty-filter");
const timeFilters = document.querySelectorAll(".time-filter");

function filterRecipes() {

    const selectedCategories = [...categoryFilters]
        .filter(filter => filter.checked)
        .map(filter => filter.value);

    const selectedIngredients = [...ingredientFilters]
        .filter(filter => filter.checked)
        .map(filter => filter.value);

    const selectedSeasons = [...seasonFilters]
        .filter(filter => filter.checked)
        .map(filter => filter.value);

    const selectedDifficulties = [...difficultyFilters]
        .filter(filter => filter.checked)
        .map(filter => filter.value);

    const selectedTimes = [...timeFilters]
        .filter(filter => filter.checked)
        .map(filter => filter.value);

    const searchText = searchInput.value.toLowerCase().trim();


    recipeCards.forEach(card => {

        const recipeCategories = card.dataset.category
            .split(",")
            .map(category => category.trim());

        const matchCategory =
            selectedCategories.length === 0 ||
            selectedCategories.some(category =>
                recipeCategories.includes(category)
            );

        const recipeIngredients = card.dataset.ingredients
            .split(",")
            .map(item => item.trim());

        const matchIngredient =
            selectedIngredients.length === 0 ||
            selectedIngredients.some(ingredient =>
                recipeIngredients.includes(ingredient)
            );

        const recipeSeasons = card.dataset.season
            .split(",")
            .map(season => season.trim());

        const matchSeason =
            selectedSeasons.length === 0 ||
            selectedSeasons.some(season =>
                recipeSeasons.includes(season)
            );

        const matchDifficulty =
            selectedDifficulties.length === 0 ||
            selectedDifficulties.includes(card.dataset.difficulty);

        const matchTime =
            selectedTimes.length === 0 ||
            selectedTimes.includes(card.dataset.time);

        const recipeName = card.querySelector("h3").textContent.toLowerCase();

        const recipeDescription = card.querySelector("p").textContent.toLowerCase();

        const recipeIngredientsText = card.dataset.ingredients.toLowerCase();

        const recipeCategoryText = card.dataset.category.toLowerCase();

        const recipeSeasonText = card.dataset.season.toLowerCase();

        const matchSearch =
            searchText === "" ||
            recipeName.includes(searchText) ||
            recipeDescription.includes(searchText) ||
            recipeIngredientsText.includes(searchText) ||
            recipeCategoryText.includes(searchText) ||
            recipeSeasonText.includes(searchText);

        if (
            matchSearch &&
            matchCategory &&
            matchIngredient &&
            matchSeason &&
            matchDifficulty &&
            matchTime
        ) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }



    });

}

//Filter tek navbar per kategorite e recipes

const params = new URLSearchParams(window.location.search);

const selectedCategory = params.get("category");

if (selectedCategory) {

    const checkbox = document.querySelector(
        `.category-filter[value="${selectedCategory}"]`
    );

    if (checkbox) {

        checkbox.checked = true;

        filterRecipes();

        document.querySelector(".recipes-section")
            ?.scrollIntoView({
                behavior: "smooth"
            });

    }

}


categoryFilters.forEach(filter => {

    filter.addEventListener("change", filterRecipes);

});

ingredientFilters.forEach(filter => {

    filter.addEventListener("change", filterRecipes);

});

seasonFilters.forEach(filter => {
    filter.addEventListener("change", filterRecipes);
});

difficultyFilters.forEach(filter => {
    filter.addEventListener("change", filterRecipes);
});

timeFilters.forEach(filter => {
    filter.addEventListener("change", filterRecipes);
});

if (searchInput) {
    searchInput.addEventListener("input", filterRecipes);
}

// PRODUCT MODAL

const productModal = document.getElementById("productModal");
const productFavoriteBtn =
    document.querySelector(".product-modal-favorite");

if (productModal) {


    const productImage =
        document.getElementById("productModalImage");

    const productTitle =
        document.getElementById("productModalTitle");

    const productDescription =
        document.getElementById("productModalDescription");

    const productPrice =
        document.getElementById("productModalPrice");

    const closeProduct =
        document.querySelector(".close-product");

    const productCards =
        document.querySelectorAll(".product-card");

    productCards.forEach(card => {

        const button =
            card.querySelector(".product-view-btn");

        if (!button) return;

        button.addEventListener("click", function (e) {

            e.preventDefault();

            productImage.src =
                card.querySelector("img").src;

            productTitle.textContent =
                card.dataset.name;

            productDescription.textContent =
                card.dataset.description;

            productPrice.textContent =
                "Price: " + card.dataset.price;

            const productData = {

                id: card.dataset.id,

                name: card.dataset.name,

                image: card.querySelector("img").src,

                description: card.dataset.description,

                price: card.dataset.price,

                unit: card.dataset.unit,

                category: card.dataset.category

            };

            localStorage.setItem(
                "selectedProduct",
                JSON.stringify(productData)
            );

            let favorites =
                JSON.parse(localStorage.getItem("favorites")) || [];

            const exists =
                favorites.includes(Number(productData.id));

            productFavoriteBtn.innerHTML = exists

                ? '<i class="fa-solid fa-heart"></i>'

                : '<i class="fa-regular fa-heart"></i>';

            productModal.classList.add("show");

            document.body.style.overflow = "hidden";

        });

    });

    closeProduct.addEventListener("click", function () {

        productModal.classList.remove("show");

        document.body.style.overflow = "auto";

    });

    window.addEventListener("click", function (e) {

        if (e.target === productModal) {

            productModal.classList.remove("show");

            document.body.style.overflow = "auto";

        }

    });

}

if (productFavoriteBtn) {

    productFavoriteBtn.addEventListener("click", function () {

        const product =
            JSON.parse(localStorage.getItem("selectedProduct"));

        let favorites =
            JSON.parse(localStorage.getItem("favorites")) || [];

        const exists =
            favorites.includes(Number(product.id));
        if (exists) {

            favorites =
                favorites.filter(id => id !== Number(product.id));
        } else {

            favorites.push(Number(product.id));

        }

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );

        updateNavbarCounts();

        productFavoriteBtn.innerHTML = exists

            ? '<i class="fa-regular fa-heart"></i>'

            : '<i class="fa-solid fa-heart"></i>';

    });

}

//Newsletter button check-up

const newsletterForm = document.getElementById("newsletterForm");
const toast = document.getElementById("toast");

if (newsletterForm && toast) {

    newsletterForm.addEventListener("submit", function (e) {


        e.preventDefault();

        const email = newsletterForm.querySelector("input");

        if (email.value.trim() === "") return;

        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 6000);

        newsletterForm.reset();

    });

}

const productsGrid = document.getElementById("productsGrid");


function displayProducts() {

    if (!productsGrid) return;

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    let filteredProducts = [...products];

    // SEARCH
    const search =
        document.getElementById("searchProduct").value.toLowerCase();

    if (search) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(search) ||
            product.description.toLowerCase().includes(search)
        );
    }

    // CATEGORY
    const category =
        document.getElementById("categoryFilter").value;

    if (category !== "all") {
        filteredProducts = filteredProducts.filter(product =>
            product.category.toLowerCase() === category
        );
    }

    // SORT
    const sort =
        document.getElementById("sortProducts").value;

    if (sort === "az") {

        filteredProducts.sort((a, b) =>
            a.name.localeCompare(b.name));

    }

    if (sort === "low") {

        filteredProducts.sort((a, b) =>
            parseFloat(a.price.replace("€", "")) -
            parseFloat(b.price.replace("€", ""))
        );

    }

    if (sort === "high") {

        filteredProducts.sort((a, b) =>
            parseFloat(b.price.replace("€", "")) -
            parseFloat(a.price.replace("€", ""))
        );

    }

    productsGrid.innerHTML = "";

    filteredProducts.forEach(product => {

        productsGrid.innerHTML += `

<div class="product-product-card">

<button class="favorite-product-btn" data-id="${product.id}">
<i class="${favorites.includes(product.id) ? "fa-solid" : "fa-regular"} fa-heart"></i>
</button>

<img src="${product.image}" alt="${product.name}">

<div class="product-content">

<span class="product-category">${product.category}</span>

<h3>${product.name}</h3>

<p>${product.description}</p>

<div class="product-footer">

<span class="product-price">${product.price}</span>

<button class="product-cart-btn"
data-id="${product.id}"
data-name="${product.name}"
data-price="${product.price}"
data-unit="${product.unit}"
data-image="${product.image}">

<i class="fa-solid fa-cart-plus"></i>

</button>

</div>

</div>

</div>

`;

    });

}

const searchProduct =
    document.getElementById("searchProduct");

const categoryFilter =
    document.getElementById("categoryFilter");

const sortProducts =
    document.getElementById("sortProducts");

if (searchProduct) {

    searchProduct.addEventListener("input", displayProducts);

}

if (categoryFilter) {

    categoryFilter.addEventListener("change", displayProducts);

}

if (sortProducts) {

    sortProducts.addEventListener("change", displayProducts);

}

const quantityModal = document.getElementById("quantityModal");

const quantityImage = document.getElementById("quantity-image");
const quantityName = document.getElementById("quantity-name");
const quantityPrice = document.getElementById("quantity-price");
const quantityInput = document.getElementById("quantity-input-container");
const quantityTotal = document.getElementById("quantity-total");

const closeQuantityModal = document.querySelector(".close-quantity-modal");
const confirmCartBtn = document.getElementById("confirm-cart-btn");
const cartItems = document.getElementById("cartItems");

const cartTotal = document.getElementById("cartTotal");

let selectedProduct = null;
let editingCart = false;

function openQuantityModal(product) {

    selectedProduct = product;

    quantityImage.src = product.image;

    quantityName.textContent = product.name;

    quantityPrice.textContent = `${product.price} / ${product.unit}`;

    quantityInput.innerHTML = "";

    if (product.unit === "kg") {

        quantityInput.innerHTML = `

        <label>Quantity (kg)</label>

        <input
            type="number"
            id="quantity-value"
            min="0.25"
            step="0.25"
            value="0.25"
        >

    `;

    } else {

        quantityInput.innerHTML = `

        <label>Quantity</label>

        <div class="quantity-box">

            <button id="minus-btn">−</button>

            <span id="quantity-value">1</span>

            <button id="plus-btn">+</button>

        </div>

    `;

    }

    if (product.unit === "kg") {

        const input = document.getElementById("quantity-value");

        input.addEventListener("input", updateTotal);

    } else {

        let quantity = 1;

        const value = document.getElementById("quantity-value");

        document.getElementById("plus-btn").onclick = function () {

            quantity++;

            value.textContent = quantity;

            updateTotal();

        };

        document.getElementById("minus-btn").onclick = function () {

            if (quantity > 1) {

                quantity--;

                value.textContent = quantity;

                updateTotal();

            }

        };

    }
    updateTotal();

    quantityModal.classList.add("show");

    document.body.style.overflow = "hidden";


}

if (confirmCartBtn) {

    confirmCartBtn.addEventListener("click", saveToCart);

}

function updateTotal() {

    let quantity;

    if (selectedProduct.unit === "kg") {

        quantity = Number(document.getElementById("quantity-value").value);

    } else {

        quantity = Number(document.getElementById("quantity-value").textContent);

    }

    const price = parseFloat(selectedProduct.price.replace("€", ""));

    quantityTotal.textContent =
        "€" + (price * quantity).toFixed(2);

}

// Save to cart function

function saveToCart() {


    let quantity;

    if (selectedProduct.unit === "kg") {

        quantity = Number(document.getElementById("quantity-value").value);

    } else {

        quantity = Number(document.getElementById("quantity-value").textContent);

    }

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct =
        cart.find(item => item.id == selectedProduct.id);

    if (editingCart) {

        existingProduct.quantity = quantity;

        editingCart = false;

    } else {

        if (existingProduct) {

            existingProduct.quantity += quantity;

        } else {

            cart.push({

                id: selectedProduct.id,
                name: selectedProduct.name,
                image: selectedProduct.image,
                price: selectedProduct.price,
                unit: selectedProduct.unit,
                quantity: quantity

            });

        }

    }
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateNavbarCounts();

    displayCart();

    quantityModal.classList.remove("show");

    document.body.style.overflow = "auto";

    showToast("Product added to cart!");


}

function showToast(message) {

    const toast = document.getElementById("toastt");

    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;

    toast.classList.add("show");

    setTimeout(function () {

        toast.classList.remove("show");

    }, 2500);

}

function displayCart() {

    if (!cartItems) return;

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `

        <h2>Your cart is empty.</h2>

        `;

        cartTotal.textContent = "€0.00";

        return;

    }

    cart.forEach(item => {

        const subtotal =
            parseFloat(item.price.replace("€", "")) * item.quantity;

        total += subtotal;

        cartItems.innerHTML += `

<div class="cart-item">

    <img src="${item.image}" alt="${item.name}">

    <div class="cart-info">

        <h3>${item.name}</h3>

        <p>

            ${item.quantity} ${item.unit}

        </p>

        <h4>

            €${subtotal.toFixed(2)}

        </h4>

    </div>

    <div class="cart-actions">

        <button
            class="edit-cart-btn"
            data-id="${item.id}">

            Edit

        </button>

        <button
            class="remove-cart-btn"
            data-id="${item.id}">

            Remove

        </button>

    </div>

</div>

`;

    });

    cartTotal.textContent =
        "€" + total.toFixed(2);

}

function removeFromCart(id) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cart =
        cart.filter(item => item.id != id);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    updateNavbarCounts();

    displayCart();

}
function editCartProduct(id) {

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const product =
        cart.find(item => item.id == id);

    if (!product) return;

    editingCart = true;

    openQuantityModal(product);

    if (product.unit === "kg") {

        document.getElementById("quantity-value").value =
            product.quantity;

    } else {

        const value =
            document.getElementById("quantity-value");

        value.textContent = product.quantity;

        let quantity = product.quantity;

        document.getElementById("plus-btn").onclick = function () {

            quantity++;

            value.textContent = quantity;

            updateTotal();

        };

        document.getElementById("minus-btn").onclick = function () {

            if (quantity > 1) {

                quantity--;

                value.textContent = quantity;

                updateTotal();

            }

        };

    }

    updateTotal();

}

if (cartItems) {

    cartItems.addEventListener("click", function (e) {

        const editBtn =
            e.target.closest(".edit-cart-btn");

        if (editBtn) {

            editCartProduct(editBtn.dataset.id);

        }

        const removeBtn =
            e.target.closest(".remove-cart-btn");

        if (!removeBtn) return;

        removeFromCart(removeBtn.dataset.id);

    });

}
// Event listeners for product buttons

if (productsGrid) {

    productsGrid.addEventListener("click", function (e) {

        const button = e.target.closest(".product-cart-btn");

        if (!button) return;

        const product = {

            id: button.dataset.id,
            name: button.dataset.name,
            price: button.dataset.price,
            unit: button.dataset.unit,
            image: button.dataset.image

        };

        openQuantityModal(product);

    });

}

const relatedProducts = document.getElementById("related-products");

if (relatedProducts) {

    relatedProducts.addEventListener("click", function (e) {

        const button = e.target.closest(".recipe-details-product-btn");

        if (!button) return;

        const product = {

            id: button.dataset.id,

            name: button.dataset.name,

            price: button.dataset.price,

            unit: button.dataset.unit,

            image: button.dataset.image

        };

        openQuantityModal(product);

    });

}

if (closeQuantityModal && quantityModal) {

    closeQuantityModal.addEventListener("click", function () {

        quantityModal.classList.remove("show");

        document.body.style.overflow = "auto";

    });

    quantityModal.addEventListener("click", function (e) {

        if (e.target === quantityModal) {

            quantityModal.classList.remove("show");

            document.body.style.overflow = "auto";

        }

    });

}

if (productsGrid) {
    displayProducts();
}

if (productsGrid) {

    productsGrid.addEventListener("click", function (e) {

        const favBtn = e.target.closest(".favorite-product-btn");

        if (!favBtn) return;

        const productId = Number(favBtn.dataset.id);

        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        if (favorites.includes(productId)) {

            favorites = favorites.filter(id => id !== productId);

        } else {

            favorites.push(productId);

        }

        localStorage.setItem("favorites", JSON.stringify(favorites));


        updateNavbarCounts();

        displayProducts();


    });

}

//favorites page

const favoritesGrid = document.getElementById("favoritesGrid");
const favoriteRecipesGrid = document.getElementById("favoriteRecipesGrid");

function displayFavorites() {

    if (!favoritesGrid) return;

    favoritesGrid.innerHTML = "";

    const favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length === 0) {

        favoritesGrid.innerHTML = `

<div class="empty-favorites">

    <i class="fa-solid fa-cart-shopping"></i>

    <h3>No favorite products yet</h3>

    <p>Add products to your favorites and they'll appear here.</p>

    <a href="products.html"
       class="empty-btn">

       Browse Products

    </a>

</div>

`;

        return;

    }

    favorites.forEach(id => {

        const product =
            products.find(p => p.id === id);

        if (!product) return;

        favoritesGrid.innerHTML += `

<div class="product-product-card">

    <button class="favorite-product-btn"
        data-id="${product.id}"
        data-name="${product.name}"
        data-price="${product.price}"
        data-unit="${product.unit}"
        data-image="${product.image}">

        <i class="fa-solid fa-heart"></i>

    </button>

    <img src="${product.image}" alt="${product.name}">

    <div class="product-card-content">

        <span class="product-category">

            ${product.category}

        </span>

        <h3>${product.name}</h3>

        <p>${product.description}</p>

        <div class="product-footer">

            <span class="product-price">

                ${product.price}

            </span>

            <div class="product-buttons">

                <button
                    class="product-cart-btn"
                    data-id="${product.id}"
                    data-name="${product.name}"
                    data-price="${product.price}"
                    data-unit="${product.unit}"
                    data-image="${product.image}">

                    <i class="fa-solid fa-cart-plus"></i>

                </button>

            </div>

        </div>

    </div>

</div>

`;

    });

}

if (favoritesGrid) {

    favoritesGrid.addEventListener("click", function (e) {

        const button = e.target.closest(".product-cart-btn");

        if (!button) return;

        const product = {

            id: button.dataset.id,
            name: button.dataset.name,
            price: button.dataset.price,
            unit: button.dataset.unit,
            image: button.dataset.image

        };

        openQuantityModal(product);

    });

}

displayFavorites();

if (favoritesGrid) {

    favoritesGrid.addEventListener("click", function (e) {

        const favBtn = e.target.closest(".favorite-product-btn");

        if (!favBtn) return;

        const productId = Number(favBtn.dataset.id);

        let favorites =
            JSON.parse(localStorage.getItem("favorites")) || [];

        favorites =
            favorites.filter(id => id !== productId);

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );
        updateNavbarCounts();

        displayFavorites();

    });

}

document.addEventListener("click", function (e) {

    const button = e.target.closest(
        ".product-cart-btn, .recipe-details-product-btn, .home-cart-btn, .recipe-cart-btn"
    );

    if (!button) return;

    const product = {

        id: button.dataset.id,
        name: button.dataset.name,
        price: button.dataset.price,
        unit: button.dataset.unit,
        image: button.dataset.image

    };

    openQuantityModal(product);

});

function displayFavoriteRecipes() {

    if (!favoriteRecipesGrid) return;

    favoriteRecipesGrid.innerHTML = "";

    const favoriteRecipes =
        JSON.parse(localStorage.getItem("favoriteRecipes")) || [];

    if (favoriteRecipes.length === 0) {

        favoriteRecipesGrid.innerHTML = `

<div class="empty-favorites">

    <i class="fa-solid fa-heart-crack"></i>

    <h3>No favorite recipes yet</h3>

    <p>Save your favorite healthy recipes here.</p>

    <a href="recipes.html"
       class="empty-btn">

       Browse Recipes

    </a>

</div>

`;
        return;

    }

    favoriteRecipes.forEach(recipeId => {

        const recipe =
            recipes.find(r => r.id === recipeId);

        if (!recipe) return;

        favoriteRecipesGrid.innerHTML += `

<div class="recipe-card"
     data-id="${recipe.id}"
     data-category="${recipe.category}"
     data-difficulty="${recipe.difficulty}"
     data-time="${recipe.time}"
     data-calories="${recipe.calories}"
     data-ingredients="${recipe.ingredients}">

    <button class="favorite-recipe-btn"
            data-id="${recipe.id}">

        <i class="fa-solid fa-heart"></i>

    </button>

    <img src="${recipe.image}" alt="${recipe.title}">

    <div class="recipe-card-content">

    <h3>${recipe.title}</h3>

    <p>${recipe.description}</p>

    <a href="#" class="view-btn">

        View Details

    </a>

</div>

</div>

`;
    });
}



if (favoriteRecipesGrid) {

    favoriteRecipesGrid.addEventListener("click", function (e) {

        const favBtn =
            e.target.closest(".favorite-recipe-btn");

        if (!favBtn) return;

        const recipeId = favBtn.dataset.id;

        let favoriteRecipes =
            JSON.parse(localStorage.getItem("favoriteRecipes")) || [];

        favoriteRecipes =
            favoriteRecipes.filter(id => id !== recipeId);

        localStorage.setItem(
            "favoriteRecipes",
            JSON.stringify(favoriteRecipes)
        );
        updateNavbarCounts();

        displayFavoriteRecipes();

    });

}

displayProducts();

displayFavorites();

displayFavoriteRecipes();

displayCart();

displayProducts();

const mobileSearch = document.getElementById("mobileRecipeSearch");

if (mobileSearch) {

    mobileSearch.addEventListener("input", function () {

        searchInput.value = this.value;

        filterRecipes();

    });

}

let cardSaved = false;
const checkoutBtn = document.getElementById("checkoutBtn");

const checkoutModal = document.getElementById("checkoutModal");
const closeCheckout = document.querySelector(".close-checkout");

const successModal =
    document.getElementById("successModal");

const continueShopping =
    document.getElementById("continueShopping");

const cardModal =
    document.getElementById("cardModal");

const closeCard =
    document.querySelector(".close-card");

const checkoutForm =
    document.getElementById("checkoutForm");



if (checkoutBtn) {

    checkoutBtn.addEventListener("click", function () {

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) {

            alert("Your cart is empty. Please add some products before checking out.");

            return;

        }

        const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        // Nëse nuk është i loguar
        if (!currentUser) {

            authModal.classList.add("show");
            document.body.style.overflow = "hidden";

            loginTab.click(); // Hap tab-in Login

            return;
        }

        // Nëse është i loguar
        checkoutModal.classList.add("show");

        document.body.style.overflow = "hidden";
    });

}

if (closeCheckout) {

    closeCheckout.onclick = function () {
        cardSaved = false;


        checkoutModal.classList.remove("show");

        document.body.style.overflow = "auto";

    }

}

if (window.location.pathname.includes("checkout.html")) {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {

        window.location.href = "cart.html";

    }

}

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const payment =
            document.querySelector('input[name="payment"]:checked').value;

        if (payment === "cash") {

            confirmOrder();

        }
        else {

            if (!cardSaved) {

                cardModal.classList.add("show");
                return;

            }

            confirmOrder();

        }
    });

}

if (closeCard) {

    closeCard.onclick = function () {

        cardModal.classList.remove("show");

    }

}

const cardForm =
    document.getElementById("cardForm");

if (cardForm) {

    cardForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const number =
            document.getElementById("cardNumber").value;

        const cvv =
            document.getElementById("cvv").value;

        const expiry =
            document.getElementById("expiryDate").value;

        if (!/^\d{16}$/.test(number)) {

            alert("Card number must contain exactly 16 digits.");

            return;

        }

        if (!/^\d{3,4}$/.test(cvv)) {

            alert("CVV must contain 3 or 4 digits.");

            return;

        }

        if (expiry === "") {

            alert("Select expiry date.");

            return;

        }

        cardSaved = true;

        cardModal.classList.remove("show");

        checkoutModal.classList.add("show");

        document.body.style.overflow = "hidden";

        const paymentTitle = document.querySelector(".payment-title");

        if (paymentTitle) {
            paymentTitle.innerHTML =
                'Payment Method <span style="color:green;">✔ Card saved</span>';
        }
    });

}

function confirmOrder() {

    const firstName =
        document.getElementById("firstName").value.trim();

    const lastName =
        document.getElementById("lastName").value.trim();

    const address =
        document.getElementById("address").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const postal =
        document.getElementById("postalCode").value.trim();

    if (

        firstName === "" ||

        lastName === "" ||

        address === "" ||

        phone === "" ||

        email === "" ||

        postal === ""

    ) {

        alert("Please complete all required fields.");

        return;

    }

    const orderID = "DL-" +

        Math.floor(

            100000 +

            Math.random() * 900000

        );

    document.getElementById("orderId").textContent =

        orderID;

    const cart =

        JSON.parse(localStorage.getItem("cart")) || [];

    const orders =

        JSON.parse(localStorage.getItem("orders")) || [];

    orders.push({

        id: orderID,

        customer: firstName + " " + lastName,

        address,

        phone,

        email,

        postal,

        items: cart,

        date: new Date().toLocaleDateString(),

    });

    localStorage.setItem(

        "orders",

        JSON.stringify(orders)

    );

    localStorage.removeItem("cart");
    updateNavbarCounts();

    cardSaved = false;

    if (cardForm) {
        cardForm.reset();
    }

    if (checkoutForm) {
        checkoutForm.reset();
    }

    checkoutModal.classList.remove("show");

    successModal.classList.add("show");

}

if (continueShopping) {

    continueShopping.addEventListener("click", function () {

        successModal.classList.remove("show");

        window.location.href = "cart.html";

    });

}
function updateNavbarCounts() {

    const favoriteRecipes =
        JSON.parse(localStorage.getItem("favoriteRecipes")) || [];

    const favoriteProducts =
        JSON.parse(localStorage.getItem("favorites")) || [];

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const favoriteCount =
        document.getElementById("favoriteCount");

    const cartCount =
        document.getElementById("cartCount");

    if (favoriteCount) {

        favoriteCount.textContent =
            favoriteRecipes.length + favoriteProducts.length;

    }

    if (cartCount) {

        cartCount.textContent = cart.length;

    }

}

updateNavbarCounts();