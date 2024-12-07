var siteNameInput = document.getElementById('siteName');
var siteUrlInput = document.getElementById('siteUrl');
var nameAlertInput = document.getElementById('nameAlert')
var urlAlertInput = document.getElementById('urlAlert')
var searchInput = document.getElementById('search')

sitesUrl = []

var website = localStorage.getItem('site');

if (website !== null){
   sitesUrl= JSON.parse(website)
    display()
}

function subBtn(){

    for (let i = 0; i < sitesUrl.length; i++) {
        if (sitesUrl[i].name.toLowerCase() === siteNameInput.value.toLowerCase() || sitesUrl[i].url.toLowerCase() === siteUrlInput.value.toLowerCase()) {
            Swal.fire({
                title: "Duplicate Site Name or Site URL ",
                text: "This site name or site url already exists. Please choose a different name.",
                icon: "error"
            });
            return; 
        }
    }
    
    sites = {
        name: siteNameInput.value,
        url: siteUrlInput.value
    }
    if (siteValidation() && urlValidation() == true) {
        sitesUrl.push(sites);
        localStorage.setItem('site', JSON.stringify(sitesUrl));
        display();
        clearInput();
    //   alert('success')
        Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "Success"
          });
        nameAlertInput.style.display = 'none';
        urlAlertInput.style.display = 'none';
    } 
    // else{
    //     // alert('Site Name or Url is not valid')
    // }
    else {
        Swal.fire({
                    title: "Site Name or Url is not valid, Please follow the rules below :",
                    text: "Site name must contain at least 3 characters & Site URL must be a valid one",
                    icon: "Not Valid"
                  });
        if (siteValidation() == false) {
            nameAlertInput.style.display = 'block';
        } 
        else {
            nameAlertInput.style.display = 'none';
        }
    
        if (urlValidation() == false) {
            urlAlertInput.style.display = 'block';
        } else {
            urlAlertInput.style.display = 'none';
        }
    }    
} 

function display(){
    var cartona = ''
    for(var i = 0; i < sitesUrl.length; i++)
        {
        cartona += `<tr class="line-table">
                        <td>${i + 1}</td>
                        <td>${sitesUrl[i].name}</td>
                         <td><button class="btn btn-primary" onclick="setValues(${i})">
                         <i class="fa fa-edit pe-2"></i>
                         Update
                         </button>
                         </td>
                        <td>
                            <button class="btn visit">
                            <i class="fa-solid fa-eye pe-2"></i>
                            <a href="${sitesUrl[i].url}" target="_blank" class="text-decoration-none">Visit</a>
                            </button>
                        </td>
                        <td>
                            <button class="btn delete" onclick="deleteItem(${i})">
                            <i class="fa-solid fa-trash-can"></i>
                                Delete
                            </button>
                        </td>
                    </tr>`
        }
    document.getElementById('demo').innerHTML= cartona
}

function clearInput(){
    siteNameInput.value=""
    siteUrlInput.value=""
    siteNameInput.classList.remove('is-valid')
    siteUrlInput.classList.remove('is-valid')
}

function deleteItem(index){
    sitesUrl.splice(index,1)
    localStorage.setItem('site', JSON.stringify(sitesUrl))
    display()
}


var superIndex = index;
var index;

function setValues(index){

    superIndex = index;

    document.getElementById('updateSite').style.display = "block"
    document.getElementById('addSub').style.display = "none"

    siteNameInput.value = sitesUrl[index].name
    siteUrlInput.value = sitesUrl[index].url
}


function updateSite(){
    
    sitesUrl[superIndex].name = siteNameInput.value
    sitesUrl[superIndex].url = siteUrlInput.value 
    localStorage.setItem('site', JSON.stringify(sitesUrl))
     display()
     clearInput()
     document.getElementById('updateSite').style.display = "none"
     document.getElementById('addSub').style.display = "block"
     for (let i = 0; i < sitesUrl.length; i++) {
        if (sitesUrl[i].name.toLowerCase() === siteNameInput.value.toLowerCase() || sitesUrl[i].url.toLowerCase() === siteUrlInput.value.toLowerCase()) {
            Swal.fire({
                title: "Duplicate Site Name or Site URL ",
                text: "This site name or site url already exists. Please choose a different name.",
                icon: "error"
            });
            return; 
        }
    }
     
 }


function searchWord(){

    var newCartona = ""

    for (var i = 0; i < sitesUrl.length; i++){
        if (sitesUrl[i].name.toLowerCase().includes(searchInput.value.toLowerCase())){
            newCartona += `
            <tr class="line-table">
                        <td>${i + 1}</td>
                        <td>${sitesUrl[i].name}</td>
                         <td><button class="btn btn-primary" onclick="setValues(${i})">
                         <i class="fa fa-edit pe-2"></i>
                         Update
                         </button>
                         </td>
                        <td>
                            <button class="btn visit">
                            <i class="fa-solid fa-eye pe-2"></i>
                            <a href="${sitesUrl[i].url}" target="_blank" class="text-decoration-none">Visit</a>
                            </button>
                        </td>
                        <td>
                            <button class="btn delete" onclick="deleteItem(${i})">
                            <i class="fa-solid fa-trash-can"></i>
                                Delete
                            </button>
                        </td>
                    </tr>
    `
        }

    }

    document.getElementById('demo').innerHTML= newCartona
    
}    
    


function siteValidation(){
    var regex = /^[a-zA-Z0-9_ ]{3,}$/
    if(regex.test(siteNameInput.value) == true){
        siteNameInput.classList.add('is-valid')
        siteNameInput.classList.remove('is-invalid')
        nameAlertInput.style.display='none'
        return true
    }
    else{
        siteNameInput.classList.add('is-invalid')
        siteNameInput.classList.remove('is-valid')
        nameAlertInput.style.display='block'
        return false        
    }
}

function urlValidation(){
    var regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/    
    if(regex.test(siteUrlInput.value) == true){
        siteUrlInput.classList.add('is-valid')
        siteUrlInput.classList.remove('is-invalid')
        urlAlertInput.style.display='none'
        return true
    }
    else{
        siteUrlInput.classList.add('is-invalid')
        siteUrlInput.classList.remove('is-valid')
        urlAlertInput.style.display='block'
        return false
    }
}
