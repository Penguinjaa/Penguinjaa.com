     
    
// grabs theme from local storage
if (localStorage.getItem('currentTheme')) {
    console.log(localStorage.getItem('currentTheme'));
    var currentTheme = localStorage.getItem('currentTheme');
    setTheme(currentTheme);
  }
  
    // when the page is loaded with a value in the storage...
    function setTheme(value) {
    // themePicker object
    var themePicker = document.getElementById('themePicker');
  
    if (value === "NEO-TOKYO") {
    themeOne();
    localStorage.setItem('currentTheme', value);
    } else if (value === "MONOCHROME") {
    themeTwo();
    localStorage.setItem('currentTheme', value);
    } else if (value === "KANYE UNIVERSE CITY") {
    themeThree();
    localStorage.setItem('currentTheme', value);
    } else if (value === "v3.33") {
    themeFour();
    localStorage.setItem('currentTheme', value);
    } else if (value === "v2.22") {
      themeFive();
      localStorage.setItem('currentTheme', value);
    } else if (value === "v1.11") {
      themeSix();
      localStorage.setItem('currentTheme', value);
    } else {
      themeOne();
    }
    var label = document.getElementById("chooseLabel");
  }
  
  function themeOne() {
    // define themes
    const themeOne = document.getElementById('themeOne');
    const themeTwo = document.getElementById('themeTwo');
    const themeThree = document.getElementById('themeThree');
    const themeFour = document.getElementById('themeFour');
    const themeFive = document.getElementById('themeFive');
    const themeSix = document.getElementById('themeSix');
  
    // enable theme
    themeOne.removeAttribute("disabled");
  
    // disable others
    themeTwo.setAttribute("disabled", "");
    themeThree.setAttribute("disabled", "");
    themeFour.setAttribute("disabled", "");
    themeFive.setAttribute("disabled", "");
    themeSix.setAttribute("disabled", "");
  }
  
  function themeTwo() {
    // define themes
    const themeOne = document.getElementById('themeOne');
    const themeTwo = document.getElementById('themeTwo');
    const themeThree= document.getElementById('themeThree');
    const themeFour = document.getElementById('themeFour');
    const themeFive = document.getElementById('themeFive');
    const themeSix = document.getElementById('themeSix');
  
    // enable theme
    themeTwo.removeAttribute("disabled");
    
    // disable others
    themeOne.setAttribute("disabled", "");
    themeThree.setAttribute("disabled", "");
    themeFour.setAttribute("disabled", "");
    themeFive.setAttribute("disabled", "");
    themeSix.setAttribute("disabled", "");
  }
    
  function themeThree() {
    // define themes
    const themeOne = document.getElementById('themeOne');
    const themeTwo = document.getElementById('themeTwo');
    const themeThree = document.getElementById('themeThree');
    const themeFour = document.getElementById('themeFour');
    const themeFive = document.getElementById('themeFive');
    const themeSix = document.getElementById('themeSix');
  
    // enable theme
    themeThree.removeAttribute("disabled");
    
    // disable others
    themeOne.setAttribute("disabled", "");
    themeTwo.setAttribute("disabled", "");
    themeFour.setAttribute("disabled", "");
    themeFive.setAttribute("disabled", "");
    themeSix.setAttribute("disabled", "");
  
  }
  
  function themeFour() {
        // define themes
        const themeOne = document.getElementById('themeOne');
        const themeTwo = document.getElementById('themeTwo');
        const themeThree = document.getElementById('themeThree');
        const themeFour = document.getElementById('themeFour');
        const themeFive = document.getElementById('themeFive');
        const themeSix = document.getElementById('themeSix');
    
        // enable theme
        themeFour.removeAttribute("disabled");
        
        // disable others
        themeOne.setAttribute("disabled", "");
        themeTwo.setAttribute("disabled", "");
        themeThree.setAttribute("disabled", "");
        themeFive.setAttribute("disabled", "");
        themeSix.setAttribute("disabled", "");
  }
  
  function themeFive() {
    // define themes
    const themeOne = document.getElementById('themeOne');
    const themeTwo = document.getElementById('themeTwo');
    const themeThree = document.getElementById('themeThree');
    const themeFour = document.getElementById('themeFour');
    const themeFive = document.getElementById('themeFive');
    const themeSix = document.getElementById('themeSix');
  
    // enable theme
    themeFive.removeAttribute("disabled");
    
    // disable others
    themeOne.setAttribute("disabled", "");
    themeTwo.setAttribute("disabled", "");
    themeThree.setAttribute("disabled", "");
    themeFour.setAttribute("disabled", "");
    themeSix.setAttribute("disabled", "");
  }
  
  function themeSix() {
  // define themes
  const themeOne = document.getElementById('themeOne');
  const themeTwo = document.getElementById('themeTwo');
  const themeThree = document.getElementById('themeThree');
  const themeFour = document.getElementById('themeFour');
  const themeFive = document.getElementById('themeFive');
  const themeSix = document.getElementById('themeSix');
  
  // enable theme
  themeSix.removeAttribute("disabled");
  
  // disable others
  themeOne.setAttribute("disabled", "");
  themeTwo.setAttribute("disabled", "");
  themeThree.setAttribute("disabled", "");
  themeFour.setAttribute("disabled", "");
  themeFive.setAttribute("disabled", "");
  }
  
window.onload = () => {
  
  /* THEME SWITCHER START */
  var sideBar = document.querySelectorAll('aside')[0];
  var themeDiv = document.createElement('div');
  themeDiv.setAttribute('id', 'themeDiv');

  var select = document.createElement('select');
  select.setAttribute('name', 'themePicker');
  select.setAttribute('id', 'themePicker');

  var optgroup1 = document.createElement('optgroup');
  optgroup1.label = "THEMES";

  var optgroup2 = document.createElement('optgroup');
  optgroup2.label = "HISTORICAL";

  var option1 = document.createElement('option');
  var option2 = document.createElement('option');
  var option3 = document.createElement('option');
  var option4 = document.createElement('option');
  var option5 = document.createElement('option');
  var option6 = document.createElement('option');
  option1.value = "NEO-TOKYO";
  option2.value = "MONOCHROME";
  option3.value = "KANYE UNIVERSE CITY";
  option4.value = "v3.33";
  option5.value = "v2.22";
  option6.value = "v1.11";
  option1.innerText = "NEO-TOKYO";
  option2.innerText = "MONOCHROME";
  option3.innerText = "KANYE UNIVERSE CITY";
  option4.innerText = "v3.33";
  option5.innerText = "v2.22";
  option6.innerText = "v1.11";

  optgroup1.appendChild(option1);
  optgroup1.appendChild(option2);
  optgroup1.appendChild(option3);

  optgroup2.appendChild(option4);
  optgroup2.appendChild(option5);
  optgroup2.appendChild(option6);

  select.appendChild(optgroup1);
  select.appendChild(optgroup2);

  // Retrieve selected theme from local storage
  var selectedTheme = localStorage.getItem('currentTheme');

  // Set the default selected option based on the theme from local storage
  if (selectedTheme) {
      select.value = selectedTheme;
  } else {
      // Set NEO-TOKYO as the default selected option if no theme is selected in local storage
      option1.setAttribute('selected', 'selected');
  }

  themeDiv.append(select);

  sideBar.prepend(themeDiv);

  select.addEventListener("change", changeTheme);

  // this is what happens after a theme is selected
  function changeTheme(e) {
      var value = e.target.value;
      console.log(value);
      var themePicker = document.getElementById('themePicker');

      if (value === "NEO-TOKYO") {
          themeOne();
          localStorage.setItem('currentTheme', value);
      } else if (value === "MONOCHROME") {
          themeTwo();
          localStorage.setItem('currentTheme', value);
      } else if (value === "KANYE UNIVERSE CITY") {
          themeThree();
          localStorage.setItem('currentTheme', value);
      } else if (value === "v3.33") {
          themeFour();
          localStorage.setItem('currentTheme', value);
      } else if (value === "v2.22") {
          themeFive();
          localStorage.setItem('currentTheme', value);
      } else if (value === "v1.11") {
          themeSix();
          localStorage.setItem('currentTheme', value);
      } else {
          themeOne();
          console.log('no theme has been selected');
      }
  }

  function displaySelected() {
      var themePicker = document.getElementById('themePicker');
  }

  displaySelected();
}
