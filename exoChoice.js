const response = document.querySelector('#response')
const yes = document.querySelector('#yes')
const no = document.querySelector('#no')
const question = document.querySelector('#question')
const progress = document.querySelector('#progress')
const container = document.querySelector('#container')

var handler = {

    set: function(obj, key, value){
        obj[key] = value
        response.textContent = obj.response
        question.textContent = obj.question 
        yes.textContent = obj.yes
        no.textContent = obj.no

        console.log('key : '+ key , 'value : ' + obj[key])
    
        return obj
    }  
};

let proxy = new Proxy({}, handler);
let state = 1; 

let progressBar = 100;
progress.value = progressBar;

const choice = {
    1 : {
        question: "choix de l'équipe",
        yes: ["red", "..."],
        no: ["yellow", "le jaune attire tout les moustiques vous vous etes déseché"],
        c: [
            () => {return},
            () => {return progressBar -= 20;}
        ],
        next: ["2","2"]
    },
    2 : {
        question: "cherchez de la food",
        yes: ["yes", "vous allez utilisé une bonne partie de votre force vitale pour vous nourrir, le jeun intermitant était peut-être une solution"],
        no: ["no", "attendre sur la plage vous donne faim..."],
        c: [
            () => {return progressBar = progressBar/2},
            () => {return progressBar -= 20;}
        ],
        next: ["3.1","3.2"]
    },
    3.1 : {
        question: "gouter ou faire gouter les trouvailles",
        yes: ["gouter", "vous etes un avenuturier agueri, vous differencez les racines, mais le repas est trop mince +5 en vie "],
        no: ["faire gouter", "vous etes généreux et ça va vous tuer"],
        c: [
            () => {return progressBar = (progressBar*2)+5},
            () => {return progressBar = 5;}
        ],
        next: ["4.1","4.2"]
    },
    3.2 : {
        question: "prendre la nourriture ou se laisser vivre",
        yes: ["prendre", "vous auriez du vous activé pour differencier le manioque d'une simple racine"],
        no: ["se laisser vivre", "vous etes le seul survivant economiser ses forces a été rentable"],
        c: [
            () => {return progressBar = 0},
            () => {return progressBar -= 20;}
        ],
        next: ["finish","4.3"]
    },
    4.1 : {
        question: "un aventurier qui a glander vous demandes pour recuperer les restes car il a faim, mais il est mal vu par le reste de l'équipe ?",
        yes: ["accepter", "le glandeur de l'equipe vous apprecie, mais vous etes mal vu par le reste de l'équipe, dorénavant vous avez des ennemies"],
        no: ["refuser", "vous semblez avoir choisi d'être influencé par l'équipe, votre empathie semble s'être fait la male pour 100K"],
        c: [
            () => {return progressBar += 20},
            () => {return progressBar += 20;}
        ],
        next: ["5.1","5.2"]
    },
    4.2 : {
        question: "vous avez de nouveau faim, chercher de la food ?",
        yes: ["chercher", "il faut savoir être égoiste de temps en temps, maintenant les autres peuvent continué l'aventure, mais sans vous..."],
        no: ["ne pas chercher", "le glandeur à vraiment eu pitié de vous, il vous à donc donné a manger, mais c'est un glandeur il n'a pas reussi à differencier les racines, vous mourrez intoxiqué"],
        c: [
            () => {return progressBar = 0},
            () => {return progressBar = 0}
        ],
        next: ["finish","finish"]
    },
    4.3 : {
        question: "il reste une journée d'aventure, continuer ou arreter ?",
        yes: ["continuer", "vous avez gagné, mais votre Façon de faire n'a pas plus aux telespactateur, il éprouve du dégout envers vous, on vous appelle dorénavent le Cafard, vous allez finir seul..."],
        no: ["arreter", "vous etes rentré, mais on vous considére comme un lache qui a arreté à un jour de la fin, on ne connait plus votre prenom, vous etes dorenavant surnommé celui qui a loupé les 100k"],
        c: [
            () => {return progressBar = 100},
            () => {return progressBar = 0;}
        ],
        next: ["finish","finish"]
    },
    5.1 : {
        question: "tout le monde vous deteste sur le camp, vous excusez auprés des autres ou faire équipe avec le glandeur?",
        yes: ["s'excuser", "vous avez été eliminé du jeu, le reste de l'équipe a feinté de vous pardonnez , pour mieux vous éliminer"],
        no: ["s'allier", "il s'avere que le glandeur est un sportif pro, qui voulait s'économiser,vous avez formé la meilleur alliance vu à ce jour, peut importe qui aller gagner vous avez fait 50/50, car gagner c'est bien, mais 50K c'est mieux..."],
        c: [
            () => {return progressBar = 0},
            () => {return progressBar = 100;}
        ],
        next: ["finish","finish"]
    },
    5.2 : {
        question: "vous avez des remords sur le camps suite à la mort du glandeur, vous vous en voulez une seul solution",
        yes: ["mourir", ""],
        no: ["mourir", ""],
        c: [
            () => {return progressBar = 0},
            () => {return progressBar = 0}
        ],
        next: ["finish","finish"]
    },

    finish : {
        question: "EndGame",
        yes: ["play Again", ""],
        no: ["play Again", ""],
        c: [
            () => {return progressBar = 100},
            () => {return progressBar = 100}
        ],
        next: ["1","1"]
    }
}

proxy.question = choice[1].question
proxy.yes = choice[1].yes[0]
proxy.no = choice[1].no[0]

container.addEventListener('click', (e) => {
    console.log(e.target);
    if (e.target.tagName != 'BUTTON') return

    if (e.target.id == 'yes') {
        proxy.response = choice[state].yes[1]
        proxy.question = choice[choice[state].next[0]].question
        proxy.yes = choice[choice[state].next[0]].yes[0]
        proxy.no = choice[choice[state].next[0]].no[0]
        choice[state].c[0]()
        console.log(progressBar)

        progress.value = progressBar;

        state = choice[state].next[0]

        console.log(state);

    } else {
        proxy.response = choice[state].no[1]
        proxy.question = choice[choice[state].next[1]].question
        proxy.yes = choice[choice[state].next[1]].yes[0]
        proxy.no = choice[choice[state].next[1]].no[0]
        choice[state].c[1]()
        console.log(progressBar)

        progress.value = progressBar;

        state = choice[state].next[1]

        console.log(state);
    }
})