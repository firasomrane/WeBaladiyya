//search DOM elements
const recherche_button= document.getElementById("recherche-button");
const selection_one= document.getElementById("slct1");
const selection_two= document.getElementById("slct2");

//Global informations DOM elements
const municipality_name= document.getElementById("municipality_name");
const municipality_parti= document.getElementById('municipality_parti');

//progress bar DOM elements
const sport_progress_bar= document.getElementById("sport_progress_bar");
const environnement_progress_bar= document.getElementById("environnement_progress_bar");
const rues_progress_bar= document.getElementById("rues_progress_bar");
const association_progress_bar= document.getElementById("association_progress_bar");

//Last update date DOM elements
const sport_last_updated= document.getElementById("sport_last_updated");
const environnement_last_updated= document.getElementById("environnement_last_updated");
const rues_last_updated= document.getElementById("rues_last_updated");
const associations_last_updated= document.getElementById("associations_last_updated");

//Promesses section DOM elements
const sport_promess_list= document.getElementById("sport_promess_list");
const environnement_promess_list= document.getElementById("environnement_promess_list");
const rues_promess_list= document.getElementById("rues_promess_list");
const associations_promess_list= document.getElementById("associations_promess_list");

//modal element
const modal_description= document.getElementById("modal_description");

//Constant HTML
//this is without edit button for the logged in user
const htmlAlwaysWithoutEB ='<div class="detail-button col-sm-3 align-items-center">\
<a href="#" class="btn btn-primary btn-block" data-toggle="modal" data-target="#editPostModal">\
<i class="fa fa-angle-double-right fa-xs"></i> Details\
</a></div>'
//this is the edit button for the logged in user
const htmlEditButton= '<br><div class="detail-button col-sm-3 align-items-center"><a href="/edit" class="btn btn-secondary"><i class="fa fa-edit fa-xs"></i> Changer</a></div>';

//html for a logged in user
const htmlAlwaysWithEB= htmlAlwaysWithoutEB+ htmlEditButton;

console.log(htmlAlwaysWithoutEB);
console.log(htmlAlwaysWithEB)



//initialize the DOM elements in every fetch request to update them.
function intializeElements(){
    modal_description.innerText="";
    sport_promess_list.innerHTML="";
    environnement_promess_list.innerHTML="";
    rues_promess_list.innerHTML="";
    associations_promess_list.innerHTML="";
    //logout_buuton
    const logout =  document.getElementById('logout_button');
}

//set the global informations for municipalities
function setGlobalInformations(jsonObject){
    municipality_name.innerText= jsonObject.municname;
    municipality_parti.innerText= jsonObject.parti;
}

//construct the layout for a section
function constructASectionLayout(parentDOMElement, informationsArray){
    informationsArray.forEach((item)=>{
        const promessItem = document.createElement('div');
        promessItem.className +=' promess-item';
        const rowDiv= document.createElement("div");
        rowDiv.className +=' row';
        const checkboxDiv= document.createElement("div");
        checkboxDiv.className+= " col-sm-2";
        const iSquare= document.createElement('i');
        iSquare.className+= ' far';
        if(item.checked==="True"){
            iSquare.className+= ' fa-check-square';
        }else{
            iSquare.className+= ' fa-square';
        }

        checkboxDiv.appendChild(iSquare);
        const descriptionDiv= document.createElement("div");
        descriptionDiv.className+= " col-sm-4";
        descriptionDiv.innerText= item.titre;
        
        rowDiv.appendChild(checkboxDiv);
        rowDiv.appendChild(descriptionDiv);
        
        if (typeof(logout) != 'undefined' && logout != null)
        {
        // exists.
        rowDiv.innerHTML+=htmlAlwaysWithoutEB;
        }
        else
        {
            rowDiv.innerHTML+=htmlAlwaysWithEB;
        }
        
        promessItem.appendChild(rowDiv);
        console.log(promessItem)
        parentDOMElement.appendChild(promessItem);
        return 0;
    })
}

//get the fetched information and display it for the user.
function constructTheLayout(jsonObject){

    intializeElements();
    
    setGlobalInformations(jsonObject);
    

    const sportPromesses= jsonObject.promesses[0]["sport"];
    const environnementPromesses= jsonObject.promesses[0]["environnement"];
    const ruesPromesses= jsonObject.promesses[0]["rues"];
    const associationsPromesses= jsonObject.promesses[0]["associations"];

    //it must be fetched from db
    modal_description.innerText="La municipalité a pu compléter ce projet avec seuleument un budget minimal de 50 milles dinars.";
    
    //construct the list layout for every section
    constructASectionLayout(sport_promess_list, sportPromesses);
    constructASectionLayout(environnement_promess_list, environnementPromesses);
    constructASectionLayout(rues_promess_list, ruesPromesses);
    constructASectionLayout(associations_promess_list, associationsPromesses);

} 

//this function fetches for the new informations
function getTheJsonFile(municipatity){
  var xmlhttp = new XMLHttpRequest();
  var url = "/consultation/"+municipatity;

  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var myArr = JSON.parse(this.responseText);
          myFunction(myArr);
      }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  function myFunction(arr) {
      console.log(arr);
      constructTheLayout(arr);
  }
}  

//the first fetch when the page is requested the first time
getTheJsonFile("Ariana Ville");

//respond 
recherche_button.addEventListener('click',sendRequest);

function sendRequest(){
    let selection_one_text, selection_two_text;
    if(selection_one.options[selection_one.selectedIndex]){
        selection_one_text = selection_one.options[selection_one.selectedIndex].text;
    }
    if(selection_two.options[selection_two.selectedIndex]){
    selection_two_text = selection_two.options[selection_two.selectedIndex].text;
    }

    if(selection_one && selection_two){
        //console.log(selection_one_text);
        //console.log(selection_two_text);
        getTheJsonFile(selection_two_text);
    }

}


function populate(s1,s2){
var s1 = document.getElementById(s1);
var s2 = document.getElementById(s2);
s2.innerHTML = "";
if(s1.value == "Ariana"){
  var optionArray = ["|","Ariana Ville|Ariana Ville","Ettadhamen|Ettadhamen","Kalaat_el-Andalous|Kalâat el-Andalous","La_Soukra|La Soukra","Mnihla|Mnihla","Sidi_Thabet|Sidi Thabet","Raoued|Raoued"];
} else if(s1.value == "Beja"){
  var optionArray = ["|","Amdoun|Amdoun","Beja_Nord|Béja Nord","Beja_Sud|Béja Sud","Goubellat|Goubellat","Medjez_el-Bab|Medjez el-Bab","Nefza|Nefza","Teboursouk|Téboursouk","Testour|Testour","Thibar|Thibar"];
}
    for(var option in optionArray){
    var pair = optionArray[option].split("|");
    var newOption = document.createElement("option");
    newOption.value = pair[0];
    newOption.innerHTML = pair[1];
    s2.options.add(newOption);
    }
}