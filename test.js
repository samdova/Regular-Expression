function validateCreditCardNumber(cardNumber) {

    //Ensure the card number is a non-empty string
    if (typeof cardNumber !== 'string' || cardNumber.trim() === '') {
        console.error('Error: Invalid input. Please provide a valid credit card number.');
        return;
    }

    // Remove spaces and dashes from the card number
    const cleanedCardNumber = cardNumber.replace(/[\s-]/g, '');

    // Define regular expressions for different credit card types
    const visaCardPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const masterCardPattern = /^5[1-5][0-9]{14}$/;
    const amexCardPattern = /^3[47][0-9]{13}$/;
    const discoverCardPattern = /^6(?:011|5[0-9]{2})[0-9]{12}$/;

    // Check if the cleaned card number matches any of the patterns
    if (visaCardPattern.test(cleanedCardNumber)) {
        // This pattern matches strings that start with a '4', followed by 12 digits, with an optional 3 additional digits at the end.
        console.log('Credit Card Type: Visa');
    } else if (masterCardPattern.test(cleanedCardNumber)) {
        // This pattern matches strings that start with a '5', followed by a digit between 1 and 5, and then exactly 14 digits.
        console.log('Credit Card Type: MasterCard');
    } else if (amexCardPattern.test(cleanedCardNumber)) {
        // This pattern matches strings that start with a '3', followed by either a '4' or '7', and then exactly 13 digits.
        console.log('Credit Card Type: American Express');
    } else if (discoverCardPattern.test(cleanedCardNumber)) {
        // This pattern matches strings that start with a '6', followed by either '011' or '5' and two digits, and then exactly 12 more digits.
        console.log('Credit Card Type: Discover');
    } else {
        console.log('Credit Card Type: Unknown');
    }

    // Validate the credit card number using the LuhnCheck Function
    if (luhnCheck(cleanedCardNumber)) {
        console.log('Credit Card Number is valid.');
    } else {
        console.log('Credit Card Number is not valid.');
    }
}

// The purpose of the Luhn algorithm (luhnCheck()) is to ensure that a given number is a valid numerical sequence, 
// particularly for credit card numbers before they are processed.
function luhnCheck(cardNumber) {
    let sum = 0;
    let doubleUp = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i), 10);

        if (doubleUp) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        doubleUp = !doubleUp;
    }

    return (sum % 10 === 0);
}

// Example usage:
const cardNumber = '4187-4515-4409-5153'; // Replace with the actual credit card number
validateCreditCardNumber(cardNumber);


/*
These regular expression patterns are designed to match specific formats of credit card numbers for Visa, 
MasterCard, American Express, and Discover cards, respectively, otherwise its unknown to the system. 
They are used to identify the card type based on the initial digits of the card number.


luhnCheck function takes a credit card number as input, iterates through its digits, 
doubles every second digit, adjusts the doubled digits if necessary, sums up all the digits, 
and then checks if the total sum is divisible by 10. 
If it is, the credit card number is considered valid.
*/