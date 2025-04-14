function generateEmailReply() {
    const emailContent = document.getElementById("emailContent").value;
    const tone = document.getElementById("tone").value;

    // Show loader and hide reply/copy button
    document.getElementById("loader").style.display = "block";
    document.getElementById("reply").style.display = "none";
    document.getElementById("copyBtn").style.display = "none";

    // Update to deployed backend URL
    fetch("https://mail-reply-generator.onrender.com/api/email/generate", {  // Replace with your actual backend URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailContent, tone })
    })
    .then(response => response.text())  // Update to response.json() if backend sends JSON
    .then(reply => {
        // Display the generated reply
        const replyDiv = document.getElementById("reply");
        replyDiv.innerText = reply;
        replyDiv.style.display = "block";
        replyDiv.classList.add("animate__fadeInUp");

        // Display the copy button
        document.getElementById("copyBtn").style.display = "inline-block";
        document.getElementById("copyBtn").classList.add("animate__fadeIn");

        // Hide the loader
        document.getElementById("loader").style.display = "none";
    })
    .catch(error => {
        alert("Error: " + error);
        document.getElementById("loader").style.display = "none";
    });
}

function copyToClipboard() {
    const replyText = document.getElementById("reply").innerText;
    navigator.clipboard.writeText(replyText).then(() => {
        // Show success message after copying
        const successMsg = document.getElementById("successMessage");
        successMsg.style.display = "block";
        successMsg.classList.add("animate__slideInRight");

        // Hide success message after 3 seconds
        setTimeout(() => {
            successMsg.style.display = "none";
        }, 3000);
    }).catch((error) => {
        alert("Failed to copy text: " + error);
    });
}
