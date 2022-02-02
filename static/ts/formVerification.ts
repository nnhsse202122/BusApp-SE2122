function verifyForm() {
    const busNumbers =  <NodeListOf<HTMLInputElement>> document.getElementsByName("busNumber");
    if (busNumbers.length == 0) {
        alert("Must have at least one bus to save");
        return false;
    }
    busNumbers.forEach((number) => {
        number.value
    })
}