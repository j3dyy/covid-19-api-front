<template>
  <div class="col-3">
    <div :class="['card', color]">
      <div class="card-statistic-3">
        <div class="card-icon card-icon-large"><i class="fas fa-users"></i></div>
        <div class="mb-4">
          <h6 class="card-title mb-0">{{name}}</h6>
        </div>
        <div class="row align-items-center mb-2 d-flex">
          <div class="col-7">
                  <span class="d-flex align-items-center mb-0">
                    {{ sumAmount }}
                  </span>
          </div>
          <div class="col-5 text-right">
            <span>{{percentAmount}} % </span>
          </div>
        </div>
        <div class="progress mt-1 " data-height="8" style="height: 8px;">
          <div class="progress-bar l-bg-green" role="progressbar" data-width="25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 25%;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CounterWidget",
  props:[
    'percentAmount',
    'sumAmount',
    'name',
    'color'
  ]
}
</script>

<style scoped>
.card {
  background-color: #fff;
  border-radius: 10px;
  border: none;
  position: relative;
  margin-bottom: 30px;
  box-shadow: 0 0.46875rem 2.1875rem rgba(90,97,105,0.1), 0 0.9375rem 1.40625rem rgba(90,97,105,0.1), 0 0.25rem 0.53125rem rgba(90,97,105,0.12), 0 0.125rem 0.1875rem rgba(90,97,105,0.1);
}
.l-bg-cherry {
  background: linear-gradient(to right, #493240, #f09) !important;
  color: #fff;
}

.l-bg-blue-dark {
  background: linear-gradient(to right, #373b44, #4286f4) !important;
  color: #fff;
}

.l-bg-green-dark {
  background: linear-gradient(to right, #0a504a, #38ef7d) !important;
  color: #fff;
}



.card .card-statistic-3 .card-icon {
  text-align: center;
  line-height: 50px;
  margin-left: 15px;
  color: #000;
  position: absolute;
  right: -5px;
  top: 20px;
  opacity: 0.1;
}

.l-bg-cyan {
  background: linear-gradient(135deg, #289cf5, #84c0ec) !important;
  color: #fff;
}

.l-bg-green {
  background: linear-gradient(135deg, #23bdb8 0%, #43e794 100%) !important;
  color: #fff;
}

.l-bg-orange {
  background: linear-gradient(to right, #f9900e, #ffba56) !important;
  color: #fff;
}

.l-bg-cyan {
  background: linear-gradient(135deg, #289cf5, #84c0ec) !important;
  color: #fff;
}
</style>