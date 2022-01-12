<template>
  <div>

    <form @submit.prevent="submitHandler()" id="survey">

      <span class="description">*Поле обязательное для заполнения.</span>

      <div>
        <label for="lastname">Фамилия*</label>
        <input id="lastname"
               name="lastname"
               type="text"
               placeholder="Иванов"
               v-model.trim="lastname"
               @blur="$v.lastname.$touch()"
        >
        <small
            class="helper-text"
            v-if="$v.lastname.$error"
        >Введите фамилию</small>
      </div>

      <div>
        <label for="firstname">Имя*</label>
        <input id="firstname"
               name="firstname"
               type="text"
               placeholder="Иван"
               v-model.trim="firstname"
               @blur="$v.firstname.$touch()"
        >
        <small
            class="helper-text"
            v-if="$v.firstname.$error"
        >Введите имя</small>
      </div>

      <div>
        <label for="patronymic">Отчество</label>
        <input id="patronymic"
               v-model="patronymic"
               name="patronymic"
               type="text"
               placeholder="Иванович">
      </div>


      <div>
        <label for="birthday">Дата рождения*</label>
        <input v-model="birthday"
               @blur="$v.birthday.$touch()"
               id="birthday"
               type="date"
               name="birthday"
        >
        <small
            class="helper-text"
            v-if="$v.birthday.$error"
        >Введите дату рождения</small>
      </div>

      <div>
        <label for="phone">Номер телефона*</label>
        <input v-model="phone"
               @blur="$v.phone.$touch()"
               id="phone"
               type="tel"
               name="phone"
               placeholder="7XXXXXXXXXX"
        >
        <small
            class="helper-text"
            v-if="$v.phone.$error"
        >Номер телефона начинается с 7 и содержит 11 цифр
        </small>
      </div>

      <div class="gender">
        <p>Пол</p>
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
      </div>

      <div class="select_block">
        <p>Группа*</p>
        <select v-model="group"
                @blur="$v.group.$touch()"
                name="group" id="group" multiple size="3"
                class="field_select">

          <option value="vip">VIP</option>
          <option value="troubles">Проблемные</option>
          <option value="oms">ОМС</option>
        </select>

        <small class="helper-text"
               v-if="$v.group.$error">
          Группа клиента обязательна, выберите хотя бы одну
        </small>

        <span class="field_multiselect_help">Можно выбрать несколько зажав <b>Ctrl(или Command)</b></span>
      </div>

      <div class="select_block">
        <p>Лечащий врач</p>
        <select class="field_select select"
                v-model="doctor"
                name="doctor"
                id="doctor"
                style="@media (min-width: 768px) { height: calc(4 * 38px)}">
          <option disabled selected value>-</option>
          <option value="ivanov">Иванов</option>
          <option value="zaharov">Захаров</option>
          <option value="chernysheva">Чернышева</option>
        </select>
      </div>

      <div class="checkbox">
        <label for="nosms">Не отправлять SMS</label>
        <input type="checkbox"
               id="nosms"
               v-model="noSms"
               value="nosms">
      </div>

      <div class="address">
        <p>Адресс клиента:</p>
        <label>
          Индекс<input type="number" v-model="zip" name="zip"
                       placeholder="XXXXXX">
        </label>
        <label>
          Страна<input type="text" v-model="country" name="country"
                       placeholder="Россия">
        </label>
        <label>
          Область<input type="text" v-model="region" name="region"
                        placeholder="Ленинградская область">
        </label>
        <label>
          Город*<input type="text"
                       v-model="city"
                       @blur="$v.city.$touch()"
                       name="city"
                       placeholder="г. Санкт-Петербург">
        </label>
        <small
            class="helper-text"
            v-if="$v.city.$error"
        >Город клиента обязателен
        </small>
        <label>
          Улица<input type="text" v-model="street" name="street"
                      placeholder="ул. Пушкина">
        </label>
        <label>
          Дом<input type="text" v-model="house" name="house"
                    placeholder="д. 8">
        </label>
      </div>

      <div class="documents">
        <p>Тип документа*</p>
        <select v-model="type"
                @blur="$v.type.$touch()"
                class="field_select select"
                name="documents" id="documents"
                style="@media (min-width: 768px) { height: calc(4 * 38px)}">
          <option value="passport">Паспорт</option>
          <option value="birthCertificate">Свидетельство о рождении</option>
          <option value="driversLicense">Вод. удостоверение</option>
        </select>
        <small
            class="helper-text"
            v-if="$v.type.$error"
        >Тип документа клиента обязателен
        </small>
        <label>Серия
          <input type="number"
                 v-model="serial"
                 name="serial"
                 placeholder="XX XX">
        </label>
        <label>Номер
          <input type="number"
                 v-model="number"
                 name="number"
                 placeholder="XXXXXX">
        </label>
        <label>Кем выдан
          <input type="text"
                 v-model="issued"
                 name="issued"
                 placeholder="Наименование учреждения">
        </label>
        <label>Дата выдачи*
          <input v-model="passportDate"
                 @blur="$v.passportDate.$touch()"
                 type="date"
                 name="passportDate">
        </label>
        <small class="helper-text"
               v-if="$v.passportDate.$error">
          Дата выдачи документа клиента обязателна
        </small>
      </div>

      <button type="submit" class="submit">добавить клиента</button>

    </form>
    <transition name="fade">
        <div class="congratulations" v-if="readyShow">
      <div class="header"> Клиент успешно добавлен.</div>
      <div class="question">Изменить данные?</div>
      <button class="notsure" @click="closeWindow">Внести изменения</button>
      <button class="sure" @click="reloadPage">Нет, всё верно</button>
    </div>
    </transition>
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
