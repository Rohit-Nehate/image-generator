
const promptinp = document.querySelector('.promptinp')
const promptt = promptinp.value
const generate = document.querySelector('.gen')

const loaderContainer= document.querySelector('.loader-container') 
const imageContainer= document.querySelector('.image-container') 
const bar = document.querySelector('.progress-bar')

generate.addEventListener('click', async ()=>{
const url =  `https://botfather.cloud/Apis/ImgGen/client.php?inputText=${encodeURIComponent(promptinp.value)}`
console.log(url)

console.log(promptinp.value.replace(/\s/g, ''))

if(promptinp.value.replace(/\s/g,'')==''){
   loaderContainer.innerText= 'please enter a prompt'
}
else{

    imageContainer.innerHTML=`<div class="loader-container"></div>
  <img class="image" src='${url}' alt="">`

  const newloaderContainer= document.querySelector('.loader-container') 
newloaderContainer.innerHTML=`
<div class="progress">
    <div class="progress-container">
        <p class="text">LOADING...</p>
        <div class="progress-bar">
            
        </div>
         </div>
`
const img = document.querySelector('.image')
 img.src=url

}



})
