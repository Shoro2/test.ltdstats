const { styler, decay, listen, pointer, value } = window.popmotion;

const slider = document.querySelector('.carousel');
const divStyler = styler(slider);
const sliderX = value(0, divStyler.set('x'));

listen(slider, 'mousedown touchstart')
  .start(() => {
    if(sliderX.get()<=100 && sliderX.get() > -3000)
    {
        pointer({ x: sliderX.get() })
            .pipe(({ x }) => x)
            .start(sliderX);
    }
    else if(sliderX.get() < -3000)
    {
        pointer({ x: -3000 })
            .pipe(({ x }) => x)
            .start(sliderX);
    }
    else if(sliderX.get() > 100)
    {
        pointer({ x: 100 })
            .pipe(({ x }) => x)
            .start(sliderX);
    }
  });

listen(document.body, 'mouseup touchend')
  .start(() => {
    decay({
      from: sliderX.get(),
      velocity: sliderX.getVelocity(),
      power: 0.1,
      //timeConstant: 1,
      //restDelta: 0.5,
      //modifyTarget: v => v
    }).start(sliderX);
  });