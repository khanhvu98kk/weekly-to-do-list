<template>
  <div>
    <form class="d-flex" @submit.prevent="addItem()">
      <input
        type="text"
        class="form-control"
        v-model="description"
        placeholder="Add a new item"
      />
    </form>
    <EmojiPicker @emoji="append" :search="search">
      <div
        class="emoji-invoker"
        slot="emoji-invoker"
        slot-scope="{ events: { click: clickEvent } }"
        @click.stop="clickEvent"
      >
        <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
        </svg>
      </div>
      <div slot="emoji-picker" slot-scope="{ emojis, insert }">
        <div class="emoji-picker">
          <div class="emoji-picker__search">
            <input type="text" v-model="search" placeholder="Search for an emoji...">
          </div>
          <div>
            <div v-for="(emojiGroup, category) in emojis" :key="category">
              <h5>{{ category }}</h5>
              <div class="emojis">
                <span
                  v-for="(emoji, emojiName) in emojiGroup"
                  :key="emojiName"
                  @click="insert(emoji)"
                  :title="emojiName"
                >{{ emoji }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EmojiPicker>
  </div>
</template>

<script>
import EmojiPicker from 'vue-emoji-picker'

export default {
  name: "NewToDo",
  components: {
    EmojiPicker
  },
  props: {},
  data() {
    return {
      description: "",
      search: ""
    };
  },
  methods: {
    addItem() {
      if (this.description.length > 0) {
        this.$emit("on-add", this.description);
      }
      this.description = "";
    },
    append(emoji) {
      console.log("inserted: ", emoji);
      this.description += emoji
    },
  }
};
</script>

<style scoped>
.wrapper {
  position: relative;
  display: inline-block;
}

.emoji-invoker {
  position: absolute;
  top: 0.5rem;
  right: 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}
.emoji-invoker:hover {
  transform: scale(1.1);
}
.emoji-invoker > svg {
  fill: #b1c6d0;
}

.emoji-picker {
  z-index: 1;
  font-family: 'Lato', Arial, Helvetica, sans-serif;
  border: 1px solid #ccc;
  width: auto;
  height: 20rem;
  overflow: scroll;
  padding: 1rem;
  margin-top: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 1px 1px 8px #c7dbe6;
}
.emoji-picker__search {
  display: flex;
}
.emoji-picker__search > input {
  flex: 1;
  border-radius: 15rem;
  border: 1px solid #ccc;
  padding: 0.2rem 1rem;
  margin-bottom: 5px;
  outline: none;
}
.emoji-picker h5 {
  margin-bottom: 0;
  color: #b1b1b1;
  text-transform: uppercase;
  font-size: 0.8rem;
  cursor: default;
}
.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}
.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}
.emoji-picker .emojis span:hover {
  background: #ececec;
  cursor: pointer;
}
</style>
