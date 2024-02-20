$(function () {

    getSettingsOperationSlider();

    function getSettingsOperationSlider () {
        $(".bicycles-slider, .slider__items").slick({
            arrows: false,
            dots: true,
            fade: true,
            autoplay: true,
            autoplaySpeed: 2000
        })
    }
  
    processingLink();

    function processingLink () {
        $(".menu, .bicycles__column").on("click","a", function (event) {
            event.preventDefault();
            const id  = $(this).attr("href"),
                top = $(id).offset().top;
            
            $("body,html").animate({scrollTop: top}, 1500);
        });
    }

    createInputPhoneMask();

    function createInputPhoneMask() {

        const phoneInput = $(".form__input-phone");
        phoneInput.on("input", onPhoneInput);

        function onPhoneInput (ev) {

            let inputValue = phoneInput.val();
            const positionCurcor = ev.target.selectionStart;    
            const numbersValueInput = getNumbersInputValue(inputValue);
            formatValueInput(ev, numbersValueInput); 

            if (inputValue.length != positionCurcor) {
                getPositionCurcor(ev, positionCurcor)
            } 
        }
       
        function getNumbersInputValue (inputValue) {
            if (inputValue[0] === "+") {
                return inputValue[0] + inputValue.slice(1).replace(/\D/g, "");
            }
            return inputValue.replace(/\D/g, "");
        }

        function formatValueInput(ev, numbersValueInput) {
            let formattedValueInput = numbersValueInput;
            const deleteSymbol = ev.originalEvent.data === null;
            if (/[7-9]/.test(numbersValueInput.slice(0,2))) {
                if (numbersValueInput[0] === "9" && !deleteSymbol) {
                    numbersValueInput = "+7" + numbersValueInput; 
                } else if (numbersValueInput[0] === "7" && !deleteSymbol) {
                    numbersValueInput = "+" +  numbersValueInput; 
                }

                let arrNumbersValueInput;
                let indexfirstSymbols;
                if (numbersValueInput[0] === "+") {
                    arrNumbersValueInput =  numbersValueInput.match(/([+0-9]{0,2})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
                    indexfirstSymbols = 1;
                } else {
                    arrNumbersValueInput =  numbersValueInput.match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
                    indexfirstSymbols = 0;
                }

                if (checkNumbersInputLength (1, 0, 1)) {       
                    formattedValueInput = arrNumbersValueInput[1] + " (" + arrNumbersValueInput[2];
                }
                if (checkNumbersInputLength (4, 3, 3)) {    
                    formattedValueInput = formattedValueInput + ") " + arrNumbersValueInput[3];
                }
                if (checkNumbersInputLength (7, 6, 4)) {        
                    formattedValueInput = formattedValueInput + "-" + arrNumbersValueInput[4];
                }
                if (checkNumbersInputLength (9, 8, 5)) {      
                    formattedValueInput = formattedValueInput + "-" + arrNumbersValueInput[5];
                }

                function checkNumbersInputLength (notEqualLength, moreLength, indexArrNumbers) {
                    return (
                        (
                            deleteSymbol 
                            && numbersValueInput.length !== notEqualLength + indexfirstSymbols 
                            && numbersValueInput.length > moreLength + indexfirstSymbols 
                        )
                        || (
                            !deleteSymbol && arrNumbersValueInput[indexArrNumbers]
                        )
                        );
                }
                
            } else if (numbersValueInput[0] !== "+" && !deleteSymbol) {
                formattedValueInput = "+" + numbersValueInput;
            }

            phoneInput.val(formattedValueInput);
           
        }

        function getPositionCurcor (ev, positionCurcor) {
            const inputNewSymbols = ev.originalEvent.data;
            let lengthNewSymbols = 0;
            if (inputNewSymbols && /\D/.test(inputNewSymbols)) {
                lengthNewSymbols = inputNewSymbols.length;
            }
            positionCurcor -= lengthNewSymbols; 
            ev.target.selectionStart = positionCurcor;
            ev.target.selectionEnd = positionCurcor;
        }

    }

    checkForm();

    function checkForm () {
        const form = $(".form");
        form.on("submit", onSubmitForm);

        function onSubmitForm (ev) {
            ev.preventDefault();
            const inputName = form.children(".form__input-name");
            const valueInputName = inputName.val();
            const inputPhone = form.children(".form__input-phone");
            const valueInputPhone = inputPhone.val();
            const valueInputColor = form.find(".form__input-radio:checked").val();
            console.log("nameForm:", inputName);
            console.log("inputColor:", valueInputColor);

            const resultInputName = checkInput(
                valueInputName, "form__input-name", "form__input-name_error", "Укажите свое имя"
            );
            const resultInputPhone = checkInput(
                valueInputPhone, "form__input-phone", "form__input-phone_error", "Укажите свой телефон"
            );

            if (resultInputName && resultInputPhone) {
                inputName.val("");
                inputPhone.val("");
                showPopap();
            }

           
            function checkInput (inputValue, inputClass, errorInputClass, text) {
                if (inputValue == "") {
                    addErrorInput(inputClass, errorInputClass, text);
                    return false;
                }
                form.children("." + errorInputClass).remove();
                return true;
            }

            function addErrorInput (inputClass, errorInputClass, text) {
                if (!form.children().is("." + errorInputClass)) {
                    form.children("." + inputClass).after(
                            `<p class=\"${errorInputClass}\" style=\"color: red;\">${text}</p>`
                        );
                }
            }

            function showPopap () {
                $(".popup").fadeIn(600, disableScroll ());

                $(".popup").click(function (event) {
                    if (event.target == this) {
                    $(this).fadeOut(600, enableScroll ());
                    }
                })

                setTimeout(() => $(".popup").fadeOut(600, enableScroll), 4000);

                function disableScroll () {
                    $("html, body").css("overflow", "hidden");
                }
            
                function enableScroll () {
                    $("html, body").css("overflow", "visible");
                }
            }

        }
    }
})