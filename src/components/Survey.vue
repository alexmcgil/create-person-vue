<template>
  <div>

    <form @submit.prevent="submitHandler()" id="survey">

      <span>*Поле обязательное для заполнения.</span>

      <div>
        <label for="lastname">Фамилия*:</label>
        <input id="lastname"
               name="lastname"
               type="text"
               placeholder="Фамилия"
               v-model.trim="lastname"
               @blur="$v.lastname.$touch()"
        >
        <small
            class="helper-text"
            v-if="$v.lastname.$error"
        >Фамилия клиента обязательно</small>
      </div>

      <div>
        <label for="firstname">Имя*:</label>
        <input id="firstname"
               name="firstname"
               type="text"
               placeholder="Имя"
               v-model.trim="firstname"
               @blur="$v.firstname.$touch()"
        >
        <small
            class="helper-text"
            v-if="$v.firstname.$error"
        >Имя клиента обязательно</small>
      </div>

      <div>
        <label for="patronymic">Отчество:</label>
        <input id="patronymic" v-model="patronymic" name="patronymic" type="text" placeholder="Отчество">
      </div>


      <div>
        <label for="birthday">Дата рождения*:</label>
        <input v-model="birthday"
               @blur="$v.birthday.$touch()"
               id="birthday"
               type="date"
               name="birthday"
        >
        <small
            class="helper-text"
            v-if="$v.birthday.$error"
        >Дата рождения клиента обязательна</small>
      </div>

      <div>
        <label for="phone">Номер телефона*:</label>
        <input v-model="phone"
               @blur="$v.phone.$touch()"
               id="phone"
               type="number"
               name="phone"
               placeholder="7XXXXXXXXXX"
        >
        <span
            class="helper-text"
            v-if="$v.phone.$error"
        >Номер телефона начинается с 7 и не может содержать больше или меньше 11 цифр
</span>
      </div>

      <div>
        <p>Пол</p>
        <label>
          <input type="radio" v-model="gender" name="gender" value="female">Ж
        </label>
        <label>
          <input type="radio" v-model="gender" name="gender" value="male">М
        </label>
      </div>

      <div class="select_block">
        <p>Группа*</p>
        <select v-model="group"
                @blur="$v.group.$touch()"
                name="group" id="group" multiple size="3"
                class="field_select"
                style="@media (min-width: 768px) { height: calc(4 * 38px)}">
          <option value="vip">VIP</option>
          <option value="troubles">Проблемные</option>
          <option value="oms">ОМС</option>
        </select>
        <span
            class="helper-text"
            v-if="$v.group.$error"
        >Группа клиента обязательна, выберите хотя бы одну
        </span>
        <span class="field_multiselect_help">Можно выбрать несколько зажав <b>Ctrl(или Command)</b></span>
      </div>

      <div class="select_block">
        <p>Лечащий врач:</p>
        <select class="field_select select" v-model="doctor" name="doctor" id="doctor"
                style="@media (min-width: 768px) { height: calc(4 * 38px)}">
          <option disabled selected value>-</option>
          <option value="ivanov">Иванов</option>
          <option value="zaharov">Захаров</option>
          <option value="chernysheva">Чернышева</option>
        </select>
      </div>

      <div>
        <label>
          <input type="checkbox" v-model="noSms" name="nosms" value="nosms">Не отправлять СМС</label>
      </div>

      <div class="address">
        <p>Адресс клиента:</p>
        <label>
          Индекс<input type="number" v-model="zip" name="zip">
        </label>
        <label>
          Страна<input type="text" v-model="country" name="country">
        </label>
        <label>
          Область<input type="text" v-model="region" name="region">
        </label>
        <label>
          Город*<input type="text" v-model="city" @blur="$v.city.$touch()" name="city">
        </label>
        <span
            class="helper-text"
            v-if="$v.city.$error"
        >Город клиента обязателен
        </span>
        <label>
          Улица<input type="text" v-model="street" name="street">
        </label>
        <label>
          Дом<input type="text" v-model="house" name="house">
        </label>
      </div>

      <div class="documents">
        <p>Тип документа*</p>
        <select v-model="type" @blur="$v.type.$touch()" class="field_select select" name="documents" id="documents"
                style="@media (min-width: 768px) { height: calc(4 * 38px)}">
          <option value="passport">Паспорт</option>
          <option value="birthCertificate">Свидетельство о рождении</option>
          <option value="driversLicense">Вод. удостоверение</option>
        </select>
        <span
            class="helper-text"
            v-if="$v.type.$error"
        >Тип документа клиента обязателен
        </span>
        <label>
          Серия<input type="number" v-model="serial" name="serial">
        </label>
        <label>
          Номер<input type="number" v-model="number" name="number">
        </label>
        <label>
          Кем выдан<input type="text" v-model="issued" name="issued">
        </label>
        <label>
          Дата выдачи*<input v-model="passportDate" @blur="$v.passportDate.$touch()" type="date" name="passportDate">
        </label>
        <span
            class="helper-text"
            v-if="$v.passportDate.$error"
        >Дата выдачи документа клиента обязателен
        </span>
      </div>

      <button type="submit" class="submit"  >добавить клиента</button>

    </form>
  </div>
</template>

<script>
import {required} from "vuelidate/lib/validators"

export default {
  name: "Survey",
  data: () => {
    return {
      lastname: null,
      firstname: null,
      patronymic: null,
      birthday: null,
      phone: null,
      gender: null,
      group: [],
      doctor: null,
      noSms: null,
      zip: null,
      country: null,
      region: null,
      city: null,
      street: null,
      house: null,
      type: null,
      serial: null,
      number: null,
      issued: null,
      passportDate: null
    }
  },
  validations: {
    lastname: {required},
    firstname: {required},
    birthday: {required},
    phone: {
      required,
      validFormat: val => /^7[0-9]{10}$/.test(val),
    },
    group: {required},
    city: {required},
    type: {required},
    passportDate: {required}
  },
  methods: {
    submitHandler() {
        this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }
      const formData = {
        lastname: this.lastname,
        firstname: this.firstname,
        patronymic: this.patronymic,
        birthday: this.birthday,
        phone: this.phone,
        gender: this.gender,
        group: this.group,
        doctor: this.doctor,
        noSms: this.noSms,
        zip: this.zip,
        country: this.country,
        city: this.city,
        street: this.street,
        house: this.house,
        type: this.type,
        serial: this.serial,
        number: this.number,
        region: this.region,
        passportDate: this.passportDate,
      }
      console.log(formData)
    },

  }
}
</script>

<style lang="sass">
input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button
  -webkit-appearance: none
  margin: 0

input[type="number"]
  -moz-appearance: textfield

.field_select
  display: block
  margin: auto
  border: 2px solid #cdd6f3
  border-bottom-right-radius: 2px
  border-bottom-left-radius: 2px
  outline-color: #cdd6f3

.field_select[multiple]
  overflow-y: auto

.field_select option
  padding: 8px 16px
  width: 338px
  cursor: pointer

.field_select option:checked
  background-color: #eceff3

.field_select option:hover
  background-color: #d5e8fb

.field_multiselect
  padding-right: 60px

input:focus
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.16)

.select
  min-width: 370px
  height: 32px
  background-color: #d5e8fb

.select option
  padding: 8px 16px
  width: 370px
  cursor: pointer
  height: 32px
  background-color: #eceff3

.select option:checked
  background-color: #d5e8fb

.address label
  display: block

.documents label
  display: block


</style>
