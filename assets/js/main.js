const grille = document.querySelector("#grille");
const reset = document.querySelector("#reset");
const start = document.querySelector("#start");
const tour = document.querySelector("#tour");
// constantes pour nos elements HTML

let nombreTour = 0;
// variable pour afficher le nombre de tours

const genererTableau = () => {
    let tableau = "<table>\n";
    for (let i = 0; i < 100; i++) {
        tableau += `<tr class="row-${i + 1}">`;
        for (let j = 0; j < 100; j++) {
            tableau += `<td class="col-${j + 1}"></td>\n`;
        }
        tableau += `</tr>\n`;
    }
    tableau += "</table>";
    return tableau;
};

//fonction pour créer notre grille


const verifNoir = (cell) => {
    const rowIndex = cell.parentElement.rowIndex;
    const cellIndex = cell.cellIndex;

    let casesblack = 0;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (!(i === 0 && j === 0)) {
                try {
                    let voisine = grille.firstChild.rows[rowIndex + i].cells[cellIndex + j];

                    if (voisine && voisine.style.backgroundColor === "black") {
                        casesblack++;
                    }
                } catch (TypeError) {
                    console.log("a");
                }
            }
        }
    }
    if ((cell.style.backgroundColor === "black" && (casesblack === 2 || casesblack === 3))) {
        return true;
    } else {
        return false;
    }
};

//fonction pour vérifier les cellules voisines des cases noires


const verifblanc = (cell) => {
    const rowIndex = cell.parentElement.rowIndex;
    const cellIndex = cell.cellIndex;

    let casesblack = 0;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (!(i === 0 && j === 0)) {
                try {
                    let voisine = grille.firstChild.rows[rowIndex + i].cells[cellIndex + j];

                    if (voisine && voisine.style.backgroundColor === "black") {
                        casesblack++;
                    }
                } catch (TypeError) {
                    console.log("a");
                }
            }
        }
    }
    if (casesblack === 3) {
        return true;
    } else {
        return false;
    }
};
// fonction pour vérifier si une case blanche a 3 voisines


const updateGrille = () => {
    let grilleIntermediaire = [];

    document.querySelectorAll("td").forEach(td => {
        const rowIndex = td.parentElement.rowIndex;
        const cellIndex = td.cellIndex;

        let yesorno;

        if (td.style.backgroundColor === "black") {
            yesorno = verifNoir(td);
        } else {
            yesorno = verifblanc(td);
        }
        if (yesorno){
            grilleIntermediaire.push({row: rowIndex,col: cellIndex, color: "black"});
        }else if(!yesorno){
            grilleIntermediaire.push({row: rowIndex,col: cellIndex, color: "white"});
        }
        
    });

    grilleIntermediaire.forEach(({ row, col, color }) => {
        grille.firstChild.rows[row].cells[col].style.backgroundColor = color;
    });

    nombreTour++;
    tour.innerHTML = `Tour : ${nombreTour}`;
};

// fonction pour utiliser nos deux fonctions pour case noire et blanche, les stocker dans un array intermediare, puis ensuite parcourir l'array intermediaire pour mettre les changements sur notre grille



const grillev = genererTableau();
grille.innerHTML = grillev;

document.querySelectorAll("td").forEach((td) => {
    td.addEventListener("click", (e) => {
        e.currentTarget.style.backgroundColor = "black";
    });
});

//fonction  pour que l'user clique sur les cases et les mette en noir

reset.addEventListener("click", () => {
    document.querySelectorAll("td").forEach((td) => {
        if (td.style.backgroundColor) {
            td.style.backgroundColor = "white";
        }
    });
    nombreTour = 0;
    tour.innerHTML = `Tour : ${nombreTour}`;
});

//fonction reset pour tout réinitialiser 


start.addEventListener("click", () => {
    setInterval(updateGrille, 200)
});


//fonction pour start avec une intervale de 200 milisecondes (2 secondes)