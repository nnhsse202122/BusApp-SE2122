function verifyForm() {
    const busNumberInputs =  <NodeListOf<HTMLInputElement>> document.getElementsByName("busNumber");
    const busNumbers = Array.from(busNumberInputs, (numberInput) => {
        return numberInput.value;
    });
    if (busNumbers.length == 0) {
        alert("Must have at least one bus to save");
        return false;
    }
    if (busNumbers.some((number) => {return busNumbers.indexOf(number) != busNumbers.lastIndexOf(number)})) {
        alert("Duplicate buses are not allowed");
        return false;
    }
}