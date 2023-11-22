document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded event triggered");
    var options = {
        "key": "rzp_test_3WAM976eBGpPqb", // Enter the Key ID generated from the Dashboard
        "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "", // your business name
        "description": "Pizza Shop Transaction",
        "image": "https://example.com/your_logo",
        // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response) {
            alert("Payment Done...");
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature)
        },
        "prefill": { // We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
            "name": "Customer Name", // your customer's name
            "email": "CustomerEmail@example.com",
            "contact": "CustomerPhoneNumber"  // Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };

    var rzp1 = new Razorpay(options);

    rzp1.on('payment.failed', function (response) {
        console.log("Payment failed:", response);
        alert("Payment Fail");
        // ... handle payment failure
    });

    var rzpButton = document.getElementById('rzp-button1');
    if (rzpButton) {
        rzpButton.addEventListener('click', function (e) {
            console.log("Pay button clicked");
            rzp1.open();
            e.preventDefault();
        });
    } else {
        console.error("Element with ID 'rzp-button1' not found.");
    }
});
