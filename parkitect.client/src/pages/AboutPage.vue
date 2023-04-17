<template>
  <div class="container-fluid">
    <section class="row px-md-5 px-2">
      <h2 class="text-center text-dark py-4">About Us</h2>
      <img class="our-picture mb-5 p-0" src="https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="hikers" >
      <p class="bg-color p-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo, rem
          reiciendis maxime omnis porro, maiores cupiditate ipsam adipisci
          perspiciatis facere saepe quia, minima iste nisi explicabo aperiam at
          mollitia unde! Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Nemo magnam voluptatem ex error. Natus harum assumenda adipisci
          unde perspiciatis nisi aliquam esse ipsa blanditiis obcaecati, maiores
          modi eius non dolor! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos magnam delectus quaerat natus placeat commodi rerum cum. Itaque eaque dolore commodi, consectetur, aut debitis ratione provident eveniet, quaerat vitae beatae.</p>
    </section>
    <section class="row px-md-5">
      <div class="col-md-6">
        <div class="row py-3 justify-content-center">
          <div class="col-md-2 col-4">
            <img class="avatar rounded-circle" src="https://media.licdn.com/dms/image/C5603AQGrQXpuC7G5IQ/profile-displayphoto-shrink_800_800/0/1662666178780?e=1687392000&v=beta&t=J_XzI2O8eZutBv6NPQeDsWfQB4AfJKgIUxK9Cm1p8SE" alt="">
          </div>
          <div class="col-6">
            <h5 class="m-0">Elizabeth Keyes</h5>
            <div>
              <a href="https://www.linkedin.com/in/elizabeth-k-6385b1183/"><i class="mdi mdi-linkedin fs-2 text-dark"></i></a>
              <a href="https://github.com/ElizabethKeyes"><i class="mdi mdi-github fs-2 text-dark"></i></a>
            </div>

          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="row py-3 justify-content-center">
          <div class="col-md-2 col-4">
            <img class="avatar rounded-circle" src="https://media.licdn.com/dms/image/D5603AQFxKB6UB4IXig/profile-displayphoto-shrink_800_800/0/1680650917170?e=1687392000&v=beta&t=4sqgn4EGthuLU7EbULEonld2T-f2a8Lx4aK-x_n1enI" alt="Alex Quan">
          </div>
          <div class="col-6">
            <h5 class="m-0">Alex Quan</h5>
            <div>
              <a href="https://www.linkedin.com/in/alex-quan-34944a105/"><i class="mdi mdi-linkedin fs-2 text-dark"></i></a>
              <a href="https://github.com/Alexmquan"><i class="mdi mdi-github fs-2 text-dark"></i></a>
            </div>

          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="row py-3 justify-content-center">
          <div class="col-md-2 col-4">
            <img class="avatar rounded-circle" src="https://media.licdn.com/dms/image/D4D03AQFqZ_TvuQ9dqg/profile-displayphoto-shrink_800_800/0/1665601597588?e=1687392000&v=beta&t=vatoPg_XD08ZAIseK1IRAIUFk9_1d5p_fG0dDgFTbm8" alt="Anastasiia Shaynyuk">
          </div>
          <div class="col-6">
            <h5 class="m-0">Anastasiia Shaynyuk</h5>
            <div>
              <a href="https://www.linkedin.com/in/anastasiia-shaynyuk/"><i class="mdi mdi-linkedin fs-2 text-dark"></i></a>
              <a href="https://github.com/AnastasiiaShaynyuk"><i class="mdi mdi-github fs-2 text-dark"></i></a>
            </div>

          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="row py-3 justify-content-center">
          <div class="col-md-2 col-4">
            <img class="avatar rounded-circle" src="https://media.licdn.com/dms/image/C5603AQE0GEM1LR-njw/profile-displayphoto-shrink_800_800/0/1588621647751?e=1687392000&v=beta&t=RZOQAY_D4wNE3l-mt5yKEiGwQVnsFQ6J2M04cx2SHI8" alt="Joseph Bowers">
          </div>
          <div class="col-6">
            <h5 class="m-0">Joseph Bowers</h5>
            <div>
              <a href="https://www.linkedin.com/in/joseph-bowers-3a3aa05a/"><i class="mdi mdi-linkedin fs-2 text-dark"></i></a>
              <a href="https://github.com/jsphbowers"><i class="mdi mdi-github fs-2 text-dark"></i></a>
            </div>

          </div>
        </div>
      </div>
    </section>


  </div>

</template>


<script>
export default {
  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>
.our-picture {
  width: 100%;
  height: 60vh;
  object-fit: cover;
  object-position: center;
}

.avatar {
  height: 5em;
  width: 5em;
}

.bg-color {
  background-color: #19875417;
}

@media screen and (max-width: 480px) {
  .our-picture {
    height: 40vh;
  }
}
</style>