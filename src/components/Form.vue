<template>
  <main>

    <form @submit.prevent="submitHandler()" id="Form" class="form">

      <span class="form__description">*Поле обязательное для заполнения.</span>

      <fieldset>
        <legend><label for="lastname">Фамилия*</label></legend>
        <input id="lastname"
               name="lastname"
               type="text"
               placeholder="Иванов"
               v-model.trim="lastname"
               @blur="$v.lastname.$touch()"
        >
        <small
            class="form__fieldset_helper-text"
            v-if="$v.lastname.$error"
        >Введите фамилию</small>
      </fieldset>

      <fieldset>
        <legend><label for="firstname">Имя*</label></legend>
        <input id="firstname"
               name="firstname"
               type="text"
               placeholder="Иван"
               v-model.trim="firstname"
               @blur="$v.firstname.$touch()"
        >
        <small
            class="form__fieldset_helper-text"
            v-if="$v.firstname.$error"
        >Введите имя</small>
      </fieldset>

      <fieldset>
        <legend><label for="patronymic">Отчество</label></legend>
        <input id="patronymic"
               v-model="patronymic"
               name="patronymic"
               type="text"
               placeholder="Иванович">
      </fieldset>


      <fieldset>
        <legend><label for="birthday">Дата рождения*</label></legend>
        <input v-model="birthday"
               @blur="$v.birthday.$touch()"
               id="birthday"
               type="date"
               name="birthday"
        >
        <small
            class="form__fieldset_helper-text"
            v-if="$v.birthday.$error"
        >Введите дату рождения</small>
      </fieldset>

      <fieldset>
        <legend><label for="phone">Номер телефона*</label></legend>
        <input v-model="phone"
               @blur="$v.phone.$touch()"
               id="phone"
               type="tel"
               name="phone"
               placeholder="7XXXXXXXXXX"
        >
        <small
            class="form__fieldset_helper-text"
            v-if="$v.phone.$error"
        >Номер телефона начинается с 7 и содержит 11 цифр
        </small>
      </fieldset>

      <fieldset class="form__gender">
        <legend class="gender__description">Пол</legend>
        <label for="female">Ж</label>
        <input type="radio"
               id="female"
               v-model="gender"
               name="gender"
               value="female">

        <label for="male">М</label>
        <input type="radio"
               id="male"
               v-model="gender"
               name="gender"
               value="male">
      </fieldset>

      <fieldset class="form__select-block">
        <legend>Группа*</legend>
        <select v-model="group"
                @blur="$v.group.$touch()"
                name="group" id="group" multiple size="3"
                class="field_select">
          <option value="vip">VIP</option>
          <option value="troubles">Проблемные</option>
          <option value="oms">ОМС</option>
        </select>

        <small class="form__fieldset_helper-text"
               v-if="$v.group.$error">
          Группа клиента обязательна, выберите хотя бы одну
        </small>

        <span class="field__multiselect_help">Можно выбрать несколько зажав <b>Ctrl(или Command)</b></span>
      </fieldset>

      <fieldset class="form__select-block">
        <legend>Лечащий врач</legend>
        <select class="select form__select-block_select field_select"
                v-model="doctor"
                name="doctor"
                id="doctor">
          <option disabled selected value>-</option>
          <option value="ivanov">Иванов</option>
          <option value="zaharov">Захаров</option>
          <option value="chernysheva">Чернышева</option>
        </select>
      </fieldset>

      <fieldset class="checkbox">
        <legend>Уведомления для клиента</legend>
        <label for="no-sms">Не отправлять SMS</label>
        <input type="checkbox"
               id="no-sms"
               v-model="noSms"
               value="no-sms">
      </fieldset>

      <fieldset class="address">
        <legend>Адресс клиента:</legend>

        <fieldset>
          <legend><label for="zip">Индекс</label></legend>
          <input type="number"
                 v-model="zip"
                 name="zip"
                 id="zip"
                 placeholder="XXXXXX">

        </fieldset>

        <fieldset>
          <legend><label for="country">Страна</label></legend>
          <input type="text"
                 v-model="country"
                 name="country"
                 id="country"
                 placeholder="Россия">

        </fieldset>

        <fieldset>
          <legend><label for="region">Область</label></legend>
          <input type="text"
                 v-model="region"
                 name="region"
                 id="region"
                 placeholder="Ленинградская область">


        </fieldset>

        <fieldset>
          <legend><label for="city">Город*</label></legend>
          <input type="text"
                 v-model="city"
                 @blur="$v.city.$touch()"
                 name="city"
                 id="city"
                 placeholder="г. Санкт-Петербург">

          <small
              class="form__fieldset_helper-text"
              v-if="$v.city.$error"
          >Город клиента обязателен
          </small>

        </fieldset>

        <fieldset>

          <legend><label for="street">Улица</label></legend>
          <input type="text"
                 v-model="street"
                 name="street"
                 id="street"
                 placeholder="ул. Пушкина">

        </fieldset>

        <fieldset>
          <legend><label for="house">Дом</label></legend>
          <input type="text"
                 v-model="house"
                 name="house"
                 id="house"
                 placeholder="д. 8">

        </fieldset>
      </fieldset>

      <fieldset class="documents">
        <legend>Документы клиента</legend>

        <fieldset>
          <legend>Тип документа*</legend>
          <select v-model="type"
                  @blur="$v.type.$touch()"
                  class="select field_select"
                  name="documents"
                  id="documents">
            <option value="passport">Паспорт</option>
            <option value="birthCertificate">Свидетельство о рождении</option>
            <option value="driversLicense">Вод. удостоверение</option>
          </select>
          <small
              class="form__fieldset_helper-text"
              v-if="$v.type.$error"
          >Тип документа клиента обязателен
          </small>

        </fieldset>
        <fieldset>
          <legend><label for="serial">Серия</label></legend>
          <input type="number"
                 v-model="serial"
                 name="serial"
                 id="serial"
                 placeholder="XX XX">

        </fieldset>
        <fieldset>

          <legend><label for="number">Номер</label></legend>
          <input type="number"
                 v-model="number"
                 name="number"
                 id="number"
                 placeholder="XXXXXX">

        </fieldset>
        <fieldset>

        <legend><label for="issued">Кем выдан</label></legend>
          <input type="text"
                 v-model="issued"
                 name="issued"
                 id="issued"
                 placeholder="Наименование учреждения">

        </fieldset>
        <fieldset>
        <legend><label for="passportDate">Дата выдачи*</label></legend>
          <input v-model="passportDate"
                 @blur="$v.passportDate.$touch()"
                 type="date"
                 id="passportDate"
                 name="passportDate">
        <small class="form__fieldset_helper-text"
               v-if="$v.passportDate.$error">
          Дата выдачи документа клиента обязателна
        </small>

        </fieldset>
      </fieldset>

      <fieldset class="submit">
        <button type="submit" class="submit_button">добавить клиента</button>
      </fieldset>

    </form>
    <transition name="fade">
      <div class="congratulations" v-if="readyShow">
        <div class="header">Вы хотите добавить клиента?</div>
        <div class="question">Вы уверенны в правильности данных?</div>
        <button class="not-sure" @click="closeWindow">Внести изменения</button>
        <button class="sure" @click="reloadPage">Всё верно</button>
      </div>
    </transition>
  </main>


</template>

<script>
import {required} from "vuelidate/lib/validators"

export default {
  name: "Form",
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
      passportDate: null,
      readyShow: false,
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
      this.readyShow = true
    },

    reloadPage() {
      window.location.reload()
    },
    closeWindow() {
      this.readyShow = false
    }
  }
}
</script>
