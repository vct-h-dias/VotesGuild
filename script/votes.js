voteInput = document.getElementById('vote');
voteInput.addEventListener('input', (e) => {
    num = e.target.value;
    console.log(num)

    const audio = new Audio('/audios/type.mp3')
    audio.play()
})

const vote = () => {
    
    const audio = new Audio('/audios/vote.mp3')
    audio.play()
}