

function parallax (e){
    this.querySelectorAll('.layer').forEach(Layers => {

    const speed = Layers.getAttribute('data-speed')

    const x= (window.innerWidth - e.pageX*speed)/70
    const y= (window.innerHeight - e.pageY*speed)/200

    Layers.style.transform=`translateX( ${x}px) translateY( ${y}px) `
});
}

document.addEventListener("mousemove", parallax);