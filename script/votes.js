const userData = JSON.parse(localStorage.getItem('userData'));
console.log(userData);

const validation = {
    number: false,
    isLoaded: false,
}
submitButton = document.getElementById('vote-btn');
const isValid = () => {
    if (!!validation.number) {
        submitButton.removeAttribute("disabled");
    } else {
        submitButton.setAttribute("disabled", "disabled");
    }
}

voteInput = document.getElementById('vote');
validInput = document.getElementById('valid-candidate');
let numbersArray = [];

const onInit = async () => {
    const data = await fetch('http://localhost:5000/php/votes.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const json = await data.json();
    const candidates = json.data;

    if (!validation.isLoaded) {

        candidates.map((candidate, index) => {
            // console.log(candidate);
            numbersArray.push(candidate.numero_candidato);
            const div = `
            <div class="control" id="${candidate.nome_candidato}-${candidate.numero_candidato}">
                <div class="field">
                <img src="../images/profile-pic.jpg" alt="${candidate.nome_candidato}" class="img"/>
            </div>
            <div class="field">
                <h1 class="sign-up-title">${candidate.nome_candidato}</h1>
            </div>
                <div class="field">
                    <h1>${candidate.numero_candidato}</h1>
                </div>
            </div>
        `;

            if (index == 0) document.getElementById('form').innerHTML = div;
            else document.getElementById('form').innerHTML += div;
        })


        
        
        
        validation.isLoaded = true;
    }

    const votesFetch = await fetch('http://localhost:5000/php/votes.php', {
        method: 'SEARCH',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const votesJson = await votesFetch.json();
    const votesData = await votesJson.data;

    // console.log(votesFetch)
    const table = `
        <table>
            <thead>
                <tr>
                    <th>Candidato</th>
                    <th>Quantidade de Votos</th>
                </tr>
            </thead>
            <tbody>
                ${votesData.map((candidate) => {
                    return `
                        <tr>
                            <td>${candidates.find(c => c.numero_candidato == candidate.numero_candidato).nome_candidato}</td>
                            <td>${candidate.quantidade_de_votos}</td>
                        </tr>
                    `
                }).join('')}
            </tbody>
        </table>
    `;

    document.getElementById('table').innerHTML = table;
    
    if (userData.voted) {
        // const candidate = document.getElementById(`${userData.voted}-${userData.id}`);
        // candidate.style.border = "2px solid #68F554";

        submitButton.setAttribute("disabled", "disabled");
        voteInput.setAttribute("disabled", "disabled");
        voteInput.value = userData.voted;

        candidates.map((candidate, index) => {
            const card = document.getElementById(`${candidate.nome_candidato}-${candidate.numero_candidato}`);

            if (candidate.numero_candidato == userData.voted) {
                card.style.transform = 'scale(1.1)';
            } else {
                card.style.opacity = "0.5";
                card.style.transform = 'scale(0.9)';
            }
        });
    }
}
onInit();
isValid();

voteInput.addEventListener('input', (e) => {
    num = e.target.value;

    if (!numbersArray.includes(num)) {
        voteInput.style.borderColor = "red";
        validInput.style.opacity = 1;
        validInput.style.marginTop = "0";
        validation.number = false;
    } else {
        voteInput.style.borderColor = "#68F554";
        validInput.style.opacity = 0;
        validInput.style.marginTop = "-20px";
        validation.number = true;
    }

    isValid()
    const audio = new Audio('/audios/type.mp3')
    audio.play()
})

const vote = async () => {

    const body = {
        email: userData.email_usuario,
        candidate: voteInput.value,
    }

    const data = await fetch('http://localhost:5000/php/votes.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    })
    const votes = await data.json();
    console.log(votes);
    if (votes.sucess) {
        userData.voted = body.candidate;
        localStorage.setItem('userData', JSON.stringify(userData));
        onInit();
    }

    const audio = new Audio('/audios/vote.mp3')
    audio.play()
}
