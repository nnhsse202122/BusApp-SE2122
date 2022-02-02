function verifyForm() {
    const busNumbers = document.getElementsByName("busNumber");
    if (busNumbers.length == 0) {
        alert("Must have at least one bus to save");
        return false;
    }
}