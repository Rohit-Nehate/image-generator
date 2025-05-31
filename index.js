
const promptinp = document.querySelector('.promptinp')
const promptt = promptinp.value
const generate = document.querySelector('.gen')
const img = document.querySelector('.image')
const imageContainer= document.querySelector('.loader-container') 
const bar = document.querySelector('.progress-bar')

generate.addEventListener('click', async ()=>{
const url = await `https://botfather.cloud/Apis/ImgGen/client.php?inputText=${encodeURIComponent(promptinp.value)}`
console.log(url)

console.log(promptinp.value.replace(/\s/g, ''))

if(promptinp.value.replace(/\s/g,'')==''){
    imageContainer.innerText= 'please enter a prompt'
}
else{
imageContainer.innerHTML=`
<div class="progress">
    <div class="progress-container">
        <p class="text">LOADING...</p>
        <div class="progress-bar">
            
        </div>
         </div>
`

    img.src = url

}



})