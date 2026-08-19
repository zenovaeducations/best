

const counters = document.querySelectorAll('.counter');
const percentCounters = document.querySelectorAll('.counter-percent');

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter = entry.target;

const target = +counter.getAttribute('data-target');

let count = 0;

const speed = target/80;

const updateCounter = ()=>{

if(count < target){

count += speed;

counter.innerText = Math.ceil(count);

requestAnimationFrame(updateCounter);

}else{

counter.innerText = target + '+';

}

};

updateCounter();

observer.unobserve(counter);

}

});

},{threshold:.5});

counters.forEach(counter=>{
observer.observe(counter);
});

percentCounters.forEach(counter=>{

observer.observe(counter);

counter.isPercent = true;

});

    </script>
    <script>

const reveals =
document.querySelectorAll('.reveal');

const revealObserver =
new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add('active');

}

});

},{
threshold:0.15
});

reveals.forEach(section=>{

revealObserver.observe(section);

});

  
