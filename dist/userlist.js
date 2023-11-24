let submitButton = document.getElementById("submitBtn");
const sameAsPermanent = document.getElementById("sameAsPermanent");
const permanentAddress = document.getElementById(
        "userPermanentAddress"
).value;
const users = [];
window.onload = function () {
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
                users.push(...JSON.parse(storedUsers));
        }
};


function validateAndCreateUser(e) {
        e.preventDefault();
        // Reset errors
        resetErrors();

        function saveUsersToLocalStorage() {
                localStorage.setItem('users', JSON.stringify(users));
        }
        // Get form values
        const firstName = document.getElementById("userFirstName").value;
        const lastName = document.getElementById("userLastName").value;
        const age = document.getElementById("userAge").value;
        const gender = document.getElementById("userGender").value;
        const email = document.getElementById("userEmail").value;
        const dob = document.getElementById("userDob").value;
        const phoneNumber = document.getElementById("userPhoneNumber").value;
        const currentAddress = document.getElementById("userCurrentAddress").value;
        const sameAsPermanent = document.getElementById("sameAsPermanent").checked;
        const permanentAddress = document.getElementById(
                "userPermanentAddress"
        ).value;
        const bloodGroup = document.getElementById("userBloodGroup").value;
        const userType = document.getElementById("userType").value;

        // Validate fields
        let isValid = true;

        if (!firstName) {
                document.getElementById("userFirstNameError").innerText =
                        "First Name is required";
                isValid = false;
        }

        if (!lastName) {
                document.getElementById("userLastNameError").innerText =
                        "Last Name is required";
                isValid = false;
        }

        if (!age) {
                document.getElementById("userAgeError").innerText = "Age is required";
                isValid = false;
        }

        if (!gender) {
                document.getElementById("userGenderError").innerText = "Gender is required";
                isValid = false;
        }

        if (!email) {
                document.getElementById("userEmailError").innerText = "Email is required";
                isValid = false;
        }

        if (!dob) {
                document.getElementById("userDobError").innerText =
                        "Date of Birth is required";
                isValid = false;
        }

        if (!phoneNumber) {
                document.getElementById("userPhoneNumberError").innerText =
                        "Phone Number is required";
                isValid = false;
        }

        if (!currentAddress) {
                document.getElementById("userCurrentAddressError").innerText =
                        "Current Address is required";
                isValid = false;
        }

        if (!sameAsPermanent && !permanentAddress) {
                document.getElementById("userPermanentAddressError").innerText =
                        "Permanent Address is required";

                isValid = false;
        }
        


        if (!bloodGroup) {
                document.getElementById("userBloodGroupError").innerText =
                        "Blood Group is required";
                isValid = false;
        }

        if (!userType) {
                document.getElementById("userTypeError").innerText =
                        "User Type is required";
                isValid = false;
        }

      //validations passed, it will  create user  store in array
        if (isValid) {
                const user = {
                        firstName,
                        lastName,
                        age,
                        gender,
                        email,
                        dob,
                        phoneNumber,
                        currentAddress,
                        permanentAddress: sameAsPermanent ? currentAddress : permanentAddress,
                        bloodGroup,
                        userType,
                };

                users.push(user);
                console.log("User created:", user);
                saveUsersToLocalStorage();

         
        }
}

function resetErrors() {
        const errorElements = document.querySelectorAll(".text-red-500");
        errorElements.forEach((element) => {
                element.innerText = "";
        });
}

sameAsPermanent.addEventListener("change",(e)=>{
        let currentAddressValue=currentAddress.value;
        permanentAddress = this.checked ? currentAddressValue: "";
        console.log(sameAsPermanent)
        
})

submitButton.addEventListener("click", validateAndCreateUser);
