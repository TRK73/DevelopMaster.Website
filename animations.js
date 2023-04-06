//animations:
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) =>{
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
  
      }else{
        entry.target.classList.remove('show');
      }
    })
  })
  
  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((el) => observer.observe(el));
    
  const hiddenBlur = document.querySelectorAll('.hiddenb');
  hiddenBlur.forEach((el) => observer.observe(el));

  const slideLeft = document.querySelectorAll('.slide-left');
  slideLeft.forEach((el) => observer.observe(el));

  const slideRight = document.querySelectorAll('.slide-right');
  slideRight.forEach((el) => observer.observe(el));
  
  const slideUp = document.querySelectorAll('.slide-up');
  slideUp.forEach((el) => observer.observe(el));

  const slideDown = document.querySelectorAll('.slide-down');
  slideDown.forEach((el) => observer.observe(el));

  const backgroundBlur = document.querySelectorAll('.backgroundb');
  backgroundBlur.forEach((el) => observer.observe(el));