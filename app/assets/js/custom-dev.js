$(document).ready(function(){
  // Events Space Tab begins
  // $('.tab_field_price input:checkbox').click(function(){
  //   if($(this).prop("checked") == true){
  //     // $(this).parent.('.event_space_na input:checkbox').prop( "disabled", true );
  //     $(this).parent('td.tab_field_price').siblings('.tab_field_na').children('input:checkbox').prop( "disabled", true );
  //     $(this).parent('td.tab_field_price').siblings('.tab_field_flat_rate').children('input:text').prop( "disabled", true );
  //     $(this).parent('td.tab_field_price').siblings('.tab_field_guest_price').children('input:text').prop( "disabled", true );
  //     // console.log($(this).parent().siblings().children());
  //   }
  //   else if($(this).prop("checked") == false){
  //     // $(this).parent.('.tab_field_na input:checkbox').prop( "disabled", true );
  //     $(this).parent('td.tab_field_price').siblings('.tab_field_na').children('input:checkbox').prop( "disabled", false );
  //     $(this).parent('td.tab_field_price').siblings('.tab_field_flat_rate').children('input:text').prop( "disabled", false );
  //     $(this).parent('td.tab_field_price').siblings('.tab_field_guest_price').children('input:text').prop( "disabled", false );
  //     // console.log($(this).parent().siblings().children());
  //   }
  // });
  
  // $('.tab_field_na input:checkbox').click(function(){
  //   if($(this).prop("checked") == true){
  //     // $(this).parent.('.tab_field_na input:checkbox').prop( "disabled", true );
  //     $(this).parent('td.tab_field_na').siblings('.tab_field_price').children('input:checkbox').prop( "disabled", true );
  //     $(this).parent('td.tab_field_na').siblings('.tab_field_flat_rate').children('input:text').prop( "disabled", true );
  //     $(this).parent('td.tab_field_na').siblings('.tab_field_guest_price').children('input:text').prop( "disabled", true );
  //     // console.log($(this).parent().siblings().children());
  //   }
  //   else if($(this).prop("checked") == false){
  //     // $(this).parent.('.tab_field_na input:checkbox').prop( "disabled", true );
  //     $(this).parent('td.tab_field_na').siblings('.tab_field_price').children('input:checkbox').prop( "disabled", false );
  //     $(this).parent('td.tab_field_na').siblings('.tab_field_flat_rate').children('input:text').prop( "disabled", false );
  //     $(this).parent('td.tab_field_na').siblings('.tab_field_guest_price').children('input:text').prop( "disabled", false );
  //     // console.log($(this).parent().siblings().children());
  //   }
  // });

  // $('.tab_field_flat_rate input:text').keyup(function(){
  //   if($(this).val().length > 0){
  //     console.log($(this).parent().siblings());
  //     console.log($(this).val().length);
  //     $(this).parent('td.tab_field_flat_rate').siblings('.tab_field_price').children('input:checkbox').prop( "disabled", true );
  //     $(this).parent('td.tab_field_flat_rate').siblings('.tab_field_na').children('input:checkbox').prop( "disabled", true );
  //     $(this).parent('td.tab_field_flat_rate').siblings('.tab_field_guest_price').children('input:text').prop( "disabled", true );
  //   }
  //   else {
  //     $(this).parent('td.tab_field_flat_rate').siblings('.tab_field_price').children('input:checkbox').prop( "disabled", false );
  //     $(this).parent('td.tab_field_flat_rate').siblings('.tab_field_na').children('input:checkbox').prop( "disabled", false );
  //     $(this).parent('td.tab_field_flat_rate').siblings('.tab_field_guest_price').children('input:text').prop( "disabled", false );
  //   }
  // })

  // $('.tab_field_guest_price input:text').keyup(function(){
  //   if($(this).val().length > 0){
  //     console.log($(this).parent().siblings());
  //     console.log($(this).val().length);
  //     $(this).parent('td.tab_field_guest_price').siblings('.tab_field_price').children('input:checkbox').prop( "disabled", true );
  //     $(this).parent('td.tab_field_guest_price').siblings('.tab_field_na').children('input:checkbox').prop( "disabled", true );
  //     $(this).parent('td.tab_field_guest_price').siblings('.tab_field_flat_rate').children('input:text').prop( "disabled", true );
  //   }
  //   else {
  //     $(this).parent('td.tab_field_guest_price').siblings('.tab_field_price').children('input:checkbox').prop( "disabled", false );
  //     $(this).parent('td.tab_field_guest_price').siblings('.tab_field_na').children('input:checkbox').prop( "disabled", false );
  //     $(this).parent('td.tab_field_guest_price').siblings('.tab_field_flat_rate').children('input:text').prop( "disabled", false );
  //   }
  // })


  // Venue Tab Begins
  // $('.venue_type_accept input:checkbox').click(function(){
  //   if($(this).prop("checked") == true){
  //     $(this).parent('td.venue_type_accept').siblings('.venue_type_not_accept').children('input:checkbox').prop( "disabled", true );
  //   }
  //   else if($(this).prop("checked") == false){
  //     $(this).parent('td.venue_type_accept').siblings('.venue_type_not_accept').children('input:checkbox').prop( "disabled", false );
  //   }
  // });

  // $('.venue_type_not_accept input:checkbox').click(function(){
  //   if($(this).prop("checked") == true){
  //     $(this).parent('td.venue_type_not_accept').siblings('.venue_type_accept').children('input:checkbox').prop( "disabled", true );
  //   }
  //   else if($(this).prop("checked") == false){
  //     $(this).parent('td.venue_type_not_accept').siblings('.venue_type_accept').children('input:checkbox').prop( "disabled", false );
  //   }
  // });
  // Venue Tab Ends

  // Venue Tab Begins
  // $('.ideal_for_accept input:checkbox').click(function(){
  //   if($(this).prop("checked") == true){
  //     $(this).parent('td.ideal_for_accept').siblings('.ideal_for_not_accept').children('input:checkbox').prop( "disabled", true );
  //   }
  //   else if($(this).prop("checked") == false){
  //     $(this).parent('td.ideal_for_accept').siblings('.ideal_for_not_accept').children('input:checkbox').prop( "disabled", false );
  //   }
  // });

  // $('.ideal_for_not_accept input:checkbox').click(function(){
  //   if($(this).prop("checked") == true){
  //     $(this).parent('td.ideal_for_not_accept').siblings('.ideal_for_accept').children('input:checkbox').prop( "disabled", true );
  //   }
  //   else if($(this).prop("checked") == false){
  //     $(this).parent('td.ideal_for_not_accept').siblings('.ideal_for_accept').children('input:checkbox').prop( "disabled", false );
  //   }
  // });
  // Venue Tab Ends

});

// Show/Hide Password Eye-icon Functionality
function showPass() {
  let pass = document.getElementById('login_password');
  let pass_img = document.getElementById('pass_click');
  // Check if the Password's type is Password
  if(pass.type === 'password'){
      pass.type = 'text';
      pass_img.src='https://uploads.staging.oregon.platform-os.com/instances/7877/assets/images/event-hound/eye-view.png?updated=1661165743';
      // console.log("Show Password");
  } else {
      pass.type = 'password';
      pass_img.src='https://uploads.staging.oregon.platform-os.com/instances/7877/assets/images/event-hound/eye-hide.png?updated=1661167097';
      // console.log("Hide Password");
  }
}


function newShowPass() {
  let pass = document.getElementById('newPassword');
  let pass_img = document.getElementById('pass_clickNew');
  // Check if the Password's type is Password
  if(pass.type === 'password'){
      pass.type = 'text';
      pass_img.src='https://uploads.staging.oregon.platform-os.com/instances/7877/assets/images/event-hound/eye-view.png?updated=1661165743';
      // console.log("Show Password");
  } else {
      pass.type = 'password';
      pass_img.src='https://uploads.staging.oregon.platform-os.com/instances/7877/assets/images/event-hound/eye-hide.png?updated=1661167097';
      // console.log("Hide Password");
  }
}

function showPassConfirm() {
  let pass = document.getElementById('passwordConfirm');
  let pass_img = document.getElementById('pass_clickConfirm');
  if(pass.type === 'password'){
    pass.type = 'text';
    pass_img.src='https://uploads.staging.oregon.platform-os.com/instances/7877/assets/images/event-hound/eye-view.png?updated=1661165743';
    // console.log("Show Password");
  } else {
    pass.type = 'password';
    pass_img.src='https://uploads.staging.oregon.platform-os.com/instances/7877/assets/images/event-hound/eye-hide.png?updated=1661167097';
    // console.log("Hide Password");
    // https://uploads.staging.oregon.platform-os.com/instances/7877/assets/images/event-hound/cross.png?updated=1662010138
  }
}




// Login Form Validation



// Login Form Email Validation
function ValidateEmail() {
  let input = document.getElementById('email-address');
  let email_img = document.getElementById('email_field_icon');

  var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (input.value.match(validRegex)) {
    console.log("Valid email address!");
    // document.getElementById('email-address').focus();
    document.getElementById('email_Invalid').style.display= "none";
    document.getElementById('login_btn').disabled = false;
    email_img.src = 'https://uploads.staging.oregon.platform-os.com/instances/7877/assets/images/event-hound/check-icon.png?updated=1660629174';
    return true;
  } else {
    console.log("Invalid email address!");
    document.getElementById('email-address').focus();
    document.getElementById('email_Invalid').style.display= "block";
    email_img.src = 'https://uploads.staging.oregon.platform-os.com/instances/7877/assets/images/event-hound/cross.png?updated=1662010138';
    // document.getElementById("login_btn").addEventListener("click", function(event){
    //   event.preventDefault()
    // });
    document.getElementById('login_btn').disabled = true;
    return false;
  }

}

// Login Form Password Validation
function validatePassword() {

  // Password field value
  let password = document.getElementById('login_password');
  let passwRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/;

  // Check if the Password Field Has 8 characters or not
  if(password.value.length >= 6) {

    // Check if the Password has lower-case or not
    var lowerCaseLetters = /[a-z]/g;
    if(password.value.match(lowerCaseLetters)) {
      console.log("This Password is Contains Lower");
      console.log(password.value.length);
      document.getElementById('login_btn').disabled = false;
      document.getElementById('password_Invalid').style.display= "none";
      document.getElementById('lower__case').style.color = "#058705";
    } else {
      console.log("This Password should be Contains Lower");
      password.focus();
      console.log(password.value.length);
      document.getElementById('login_btn').disabled = true;
      document.getElementById('password_Invalid').style.display= "block";
      document.getElementById('lower__case').style.color = "#fb5050";
    }
  
    // Check if Password has Upper-case letter or not
    var upperCaseLetters = /[A-Z]/g;
    if(password.value.match(upperCaseLetters)) {
      console.log("This Password is Contains Upper");
      console.log(password.value.length);
      document.getElementById('login_btn').disabled = false;
      document.getElementById('password_Invalid').style.display= "none";
      document.getElementById('upper__case').style.color = "#058705";
    } else {
      console.log("This Password should be Contains Upper");
      password.focus();
      console.log(password.value.length);
      document.getElementById('login_btn').disabled = true;
      document.getElementById('password_Invalid').style.display= "block";
      document.getElementById('upper__case').style.color = "#fb5050";
    }
  
    // Check if Password has Numeric Digit or not
    var numbers = /[0-9]/g;
    if(password.value.match(numbers)) {
      console.log("This Password is Contains Number");
      console.log(password.value.length);
      document.getElementById('login_btn').disabled = false;
      document.getElementById('password_Invalid').style.display= "none";
      document.getElementById('one__number').style.color = "#058705";
    } else {
      console.log("This Password should be Contains Number");
      password.focus();
      console.log(password.value.length);
      document.getElementById('login_btn').disabled = true;
      document.getElementById('password_Invalid').style.display= "block";
      document.getElementById('one__number').style.color = "#fb5050";
    }
  
    // Check if Password has Special Character or not
    var special_chars = /[!@#$%^&*_=+-]/g;
    if(password.value.match(special_chars)) {
      console.log("This Password is Contains Special Character");
      console.log(password.value.length);
      document.getElementById('login_btn').disabled = false;
      document.getElementById('password_Invalid').style.display= "none";
      document.getElementById('special__char').style.color = "#058705";
    } else {
      console.log("This Password should be Contains Special Character");
      password.focus();
      console.log(password.value.length);
      document.getElementById('login_btn').disabled = true;
      document.getElementById('password_Invalid').style.display= "block";
      document.getElementById('special__char').style.color = "#fb5050";
    }
  
  
    document.getElementById('min__six__char').style.color = "#058705";
    document.getElementById('password_minSixChar').style.display= "none";
    // if(password.value.length < 6) {
    //   console.log(password.value.length);
    // } else {
    //   console.log("Password id Greater than or Equal to 6");
    // }
  } else {
    password.focus();
    document.getElementById('login_btn').disabled = true;
    console.log("This Password should be minimum 6 Character");
    document.getElementById('password_Invalid').style.display= "none";
    document.getElementById('password_minSixChar').style.display= "block";
    // document.getElementById('password_minSixChar').style.display= "block";

    
  }

}


// Reset Password With Email Link (Reset Page)
// Login Form Password Validation
function validateNewPassword() {

  // Password field value
  let newPassword = document.getElementById('newPassword');
  let passwRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/;

  // Check if the Password Field Has 8 characters or not
  if(newPassword.value.length >= 6) {

    document.getElementById('min__six__char').style.color = "#058705";

    // Check if the Password has lower-case or not
    var lowerCaseLetters = /[a-z]/g;
    if(newPassword.value.match(lowerCaseLetters)) {
      console.log("This Password is Contains Lower");
      console.log(newPassword.value.length);
      document.getElementById('newPassword_Invalid').style.display= "none";
      document.getElementById('lower__case').style.color = "#058705";
      // document.getElementById('newPasswordSubmit').disabled = false;
    } else {
      console.log("This Password should be Contains Lower");
      newPassword.focus();
      console.log(newPassword.value.length);
      document.getElementById('newPassword_Invalid').style.display= "block";
      document.getElementById('lower__case').style.color = "#fb5050";
      // document.getElementById('newPasswordSubmit').disabled = true;
    }
  
    // Check if Password has Upper-case letter or not
    var upperCaseLetters = /[A-Z]/g;
    if(newPassword.value.match(upperCaseLetters)) {
      console.log("This Password is Contains Upper");
      console.log(newPassword.value.length);
      document.getElementById('newPassword_Invalid').style.display= "none";
      document.getElementById('upper__case').style.color = "#058705";
      // document.getElementById('newPasswordSubmit').disabled = false;
    } else {
      console.log("This Password should be Contains Upper");
      newPassword.focus();
      console.log(newPassword.value.length);
      document.getElementById('newPassword_Invalid').style.display= "block";
      document.getElementById('upper__case').style.color = "#fb5050";
      // document.getElementById('newPasswordSubmit').disabled = true;
    }
  
    // Check if Password has Special Character or not
    var special_chars = /[!@#$%^&*_=+-]/g;
    if(newPassword.value.match(special_chars)) {
      console.log("This Password is Contains Special Character");
      console.log(newPassword.value.length);
      // document.getElementById('login_btn').disabled = false;
      document.getElementById('newPassword_Invalid').style.display= "none";
      document.getElementById('special__char').style.color = "#058705";
    } else {
      console.log("This Password should be Contains Special Character");
      newPassword.focus();
      console.log(newPassword.value.length);
      // document.getElementById('login_btn').disabled = true;
      document.getElementById('newPassword_Invalid').style.display= "block";
      document.getElementById('special__char').style.color = "#fb5050";
    }
  
  
    // Check if Password has Numeric Digit or not
    var numbers = /[0-9]/g;
    if(newPassword.value.match(numbers)) {
      console.log("This Password is Contains Number");
      console.log(newPassword.value.length);
      // document.getElementById('newPassword_Invalid').style.display= "none";
      document.getElementById('one__number').style.color = "#058705";
      // document.getElementById('newPasswordSubmit').disabled = false;
    } else {
      console.log("This Password should be Contains Number");
      newPassword.focus();
      console.log(newPassword.value.length);
      document.getElementById('newPassword_Invalid').style.display= "block";
      document.getElementById('one__number').style.color = "#fb5050";
      // document.getElementById('newPasswordSubmit').disabled = true;
    }


    // let newPass = document.getElementById('newPassword');
    let confirmNewPass = document.getElementById('passwordConfirm');
    // console.log(newPass.value);
    // console.log(confirmNewPass.value);
    if(newPassword.value === confirmNewPass.value) {
      document.getElementById('newPasswordSubmit').disabled = false;
      console.log("The Password is Matched")
    } else {
      document.getElementById('newPasswordSubmit').disabled = true;
      console.log("The Password is Not Matched")
    }
    
  
  
    document.getElementById('password_minSixChar').style.display= "none";
  
    // if(newPassword.value.length < 6) {
    //   console.log(newPassword.value.length);
    // } else {
    //   console.log("Password id Greater than or Equal to 6");
    // }
  } else {
    newPassword.focus();
    document.getElementById('newPasswordSubmit').disabled = true;
    console.log("This Password should be minimum 6 Character");
    document.getElementById('newPassword_Invalid').style.display= "none";
    document.getElementById('password_minSixChar').style.display= "block";
  }

}

// Login Form Password Validation
function validateConfirmNewPassword() {

  // Password field value
  let confirmNewPassword = document.getElementById('passwordConfirm');
  let passwRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/;

  // Check if the Password Field Has 8 characters or not
  if(confirmNewPassword.value.length >= 6) {


    document.getElementById('cnf_passwordLike').innerHTML = "Confirm Password Show be same as above";
    document.getElementById('cnf_min__six__char').style.color = "#058705";
    // Check if the Password has lower-case or not
    var lowerCaseLetters = /[a-z]/g;
    if(confirmNewPassword.value.match(lowerCaseLetters)) {
      console.log("This Confirm-Password is Contains Lower");
      console.log(confirmNewPassword.value.length);
      document.getElementById('confirmNewPassword_Invalid').style.display= "none";
      document.getElementById('cnf_lower__case').style.color = "#058705";
      // document.getElementById('newPasswordSubmit').disabled = false;
    } else {
      console.log("This Confirm-Password should be Contains Lower");
      confirmNewPassword.focus();
      console.log(confirmNewPassword.value.length);
      document.getElementById('confirmNewPassword_Invalid').style.display= "block";
      document.getElementById('cnf_lower__case').style.color = "#fb5050";
      // document.getElementById('newPasswordSubmit').disabled = true;
    }
  
    // Check if Password has Upper-case letter or not
    var upperCaseLetters = /[A-Z]/g;
    if(confirmNewPassword.value.match(upperCaseLetters)) {
      console.log("This Confirm-Password is Contains Upper");
      console.log(confirmNewPassword.value.length);
      document.getElementById('confirmNewPassword_Invalid').style.display= "none";
      document.getElementById('cnf_upper__case').style.color = "#058705";
      // document.getElementById('newPasswordSubmit').disabled = false;
    } else {
      console.log("This Confirm-Password should be Contains Upper");
      confirmNewPassword.focus();
      console.log(confirmNewPassword.value.length);
      document.getElementById('confirmNewPassword_Invalid').style.display= "block";
      document.getElementById('cnf_upper__case').style.color = "#fb5050";
      // document.getElementById('newPasswordSubmit').disabled = true;
    }
  
    // Check if Password has Special Character or not
    var special_chars = /[!@#$%^&*_=+-]/g;
    if(confirmNewPassword.value.match(special_chars)) {
      console.log("This Confirm-Password is Contains Special Character");
      console.log(confirmNewPassword.value.length);
      document.getElementById('confirmNewPassword_Invalid').style.display= "none";
      document.getElementById('cnf_special__char').style.color = "#058705";
      // document.getElementById('newPasswordSubmit').disabled = false;
    } else {
      console.log("This Confirm-Password should be Contains Special Character");
      confirmNewPassword.focus();
      console.log(confirmNewPassword.value.length);
      document.getElementById('confirmNewPassword_Invalid').style.display= "block";
      document.getElementById('cnf_special__char').style.color = "#fb5050";
      // document.getElementById('newPasswordSubmit').disabled = true;
    }
  
    // Check if Password has Numeric Digit or not
    var numbers = /[0-9]/g;
    if(confirmNewPassword.value.match(numbers)) {
      console.log("This Confirm-Password is Contains Number");
      console.log(confirmNewPassword.value.length);
      document.getElementById('confirmNewPassword_Invalid').style.display= "none";
      document.getElementById('cnf_one__number').style.color = "#058705";
      // document.getElementById('newPasswordSubmit').disabled = false;
    } else {
      console.log("This Confirm-Password should be Contains Number");
      confirmNewPassword.focus();
      console.log(confirmNewPassword.value.length);
      document.getElementById('confirmNewPassword_Invalid').style.display= "block";
      document.getElementById('cnf_one__number').style.color = "#fb5050";
      // document.getElementById('newPasswordSubmit').disabled = true;
    }
  


    let newPass = document.getElementById('newPassword');
    // let confirmNewPass = document.getElementById('passwordConfirm');
    // console.log(newPass.value);
    // console.log(confirmNewPass.value);
    if(newPass.value === confirmNewPassword.value) {
      document.getElementById('newPasswordSubmit').disabled = false;
      console.log("The Password is Matched")
    } else {
      document.getElementById('newPasswordSubmit').disabled = true;
      console.log("The Password is Not Matched")
    }
  
  
    document.getElementById('confirmPassword_minSixChar').style.display= "none";
    // if(confirmNewPassword.value.length < 6) {
    //   console.log(confirmNewPassword.value.length);
    // } else {
    //   console.log("Password id Greater than or Equal to 6");
    // }
  } else {
    confirmNewPassword.focus();
    document.getElementById('newPasswordSubmit').disabled = true;
    console.log("This Confirm-Password should be minimum 6 Character");
    document.getElementById('confirmNewPassword_Invalid').style.display= "none";
    document.getElementById('confirmPassword_minSixChar').style.display= "block";
  }

}




function validateForm() {
  // This function deals with validation of the form fields
  let input = document.getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < input.length; i++) {
    // If a field is empty...
    if (input[i].value == "") { 
      // add an "invalid" class to the field:
      input[i].className += " invalid";
      document.getElementById("signup").addEventListener("click",(event)=>{
        event.preventDefault();
      });
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function divFunction(inputClass){
  var countLength =  $("."+inputClass).length;
  var nextValue =  countLength+1;
  var inputName= inputClass;
  var htmlAppend = '<div class="sm:block md:flex w-full gap-x-5 '+inputClass+'"><div class="sm:w-full md:w-1/3 rounded md:mb-3 xl:mb-6 sm:mb-3 relative"><input id="Address" name="features['+inputName+']['+nextValue+'][feature_name]" type="text" autocomplete="address" class="rounded-3xl appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-themeBlue-500 focus:border-themeBlue-500 focus:z-10 text-lg font-Work sm:text-sm lg:sm xl:text-lg" placeholder="Swimming Pool"> </div> <div class="sm:w-full md:w-1/3 rounded md:mb-3 xl:mb-6 sm:mb-3 relative"><input id="Address" name="features['+inputName+']['+nextValue+'][feature_available]" type="text" autocomplete="address" class="rounded-3xl appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-themeBlue-500 focus:border-themeBlue-500 focus:z-10 text-lg font-Work sm:text-sm lg:sm xl:text-lg" placeholder="Swimming Pool"> </div> <div class="sm:w-full md:w-1/4 rounded md:mb-3 xl:mb-6 sm:mb-3 relative"><input id="Address" name="features['+inputName+']['+nextValue+'][feature_price]" type="text" autocomplete="address" class="rounded-3xl appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-themeBlue-500 focus:border-themeBlue-500 focus:z-10 text-lg font-Work sm:text-sm lg:sm xl:text-lg"  placeholder="price"></div><div class="w-1/12 rounded md:mb-3 xl:mb-6 sm:mb-3 relative justify-center flex items-center mt-4"> <input id="check" name="features['+inputName+']['+nextValue+'][feature_check]" type="checkbox" class="form-checkbox rounded h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1 font-Work" value="0"></div></div>'

  $("#"+inputClass).append(htmlAppend);
}


function dropdown() {
  return {
      options: [],
      selected: [],
      show: false,
      open() { this.show = true },
      close() { this.show = false },
      isOpen() { return this.show === true },
      select(index, event) {

          if (!this.options[index].selected) {

              this.options[index].selected = true;
              this.options[index].element = event.target;
              this.selected.push(index);

          } else {
              this.selected.splice(this.selected.lastIndexOf(index), 1);
              this.options[index].selected = false
          }
      },
      remove(index, option) {
          this.options[option].selected = false;
          this.selected.splice(index, 1);


      },
      loadOptions() {
          const options = document.getElementById('select').options;
          for (let i = 0; i < options.length; i++) {
              this.options.push({
                  value: options[i].value,
                  text: options[i].innerText,
                  selected: options[i].getAttribute('selected') != null ? options[i].getAttribute('selected') : false
              });
          }


      },
      selectedValues(){
          return this.selected.map((option)=>{
              return this.options[option].value;
          })
      }
  }
}