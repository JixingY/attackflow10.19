<template>
  <div class="text-labeling" style="width: 65%;">
    <div class="text-display">
      <h2>Incident Report</h2>
      <div class="highlighted-text" @mouseup="highlightText">
        <p v-html="highlightedText"></p>
      </div>
    </div>

    <div class="right-section">
      <div class="keyword-list">
        <h2>Keywords</h2>
        <ul>
          <li v-for="(keyword, index) in keywords" :key="index">{{ keyword }}</li>
        </ul>
      </div>
      <button class="save-button" @click="saveHighlightedKeywords">Save</button>

      <!-- Search bar with dynamic dropdown -->
      <div class="search-bar">
        <input type="text" placeholder="Search for tags" @input="filterOptions" style="width: 43%; height: 15px; font-size: 16px; padding: 5px;">
        <select v-model="selectedOption">
          <option value="annotation-tags" selected>Annotation Tags</option>
          <option value="defined-technique-1">defined-technique-1</option>
          <option value="defined-technique-2">defined-technique-2</option>
          <option value="defined-technique-3">defined-technique-3</option>
        </select>
        <button class="annotate-button" @click="annotateTag">Annotate</button>
      </div>

      <div class="annotation-tags" style="margin-top: 20px;">
        <h2>Annotating History</h2>
        <div style="margin-bottom: 7px;"> </div>
       
        <p v-for="(annotation, index) in annotatingHistory" :key="index">{{ annotation }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute } from 'vue-router';

export default {
  props: {
    router: {
      type: Object,
    },
  },
  setup(props) {
    const filterOptions = () => {
      const searchInput = document.querySelector('.search-bar input');
      const select = document.querySelector('.search-bar select');
      const userInput = searchInput.value.toLowerCase();

      for (let i = 0; i < select.options.length; i++) {
        const option = select.options[i];
        const optionText = option.textContent.toLowerCase();

        if (optionText.includes(userInput)) {
          option.style.display = 'block';
        } else {
          option.style.display = 'none';
        }
      }
    };

    const route = useRoute();
    const filePath = ref(route.query.filePath || "");
    const fileContent = ref("");
    const keywords = ref([]);
    const selectedText = ref("");
    const selectedOption = ref("annotation-tags");

    const highlightedText = computed(() => {
      // Highlight keywords in the content
      let highlighted = fileContent.value;
      keywords.value.forEach((keyword) => {
        const regex = new RegExp(keyword, "g");
        highlighted = highlighted.replace(regex, `<span class="highlight">${keyword}</span>`);
      });
      return highlighted;
    });

    const highlightText = () => {
      const selection = window.getSelection();
      selectedText.value = selection.toString();
    };

    const saveHighlightedKeywords = () => {
      if (selectedText.value.trim() !== "") {
        keywords.value.push(selectedText.value);
        selectedText.value = "";
      }
    };

     const annotatingHistory = ref([]);

    const annotateTag = () => {
      if (selectedOption.value !== "annotation-tags") {
        // Append the selected option to the annotation history
        annotatingHistory.value.push(selectedOption.value);

        // Scroll to the newly added item
        const annotatingHistoryDiv = document.querySelector(".annotation-tags");
        annotatingHistoryDiv.scrollTop = annotatingHistoryDiv.scrollHeight;
      }
      selectedOption.value = "annotation-tags"; 
    };


    // Fetch file content when the component is mounted
    onMounted(async () => {
      const response = await fetch(`http://localhost:9999/upload/getFileContent?filePath=${filePath.value}`);
      const data = await response.json();
      fileContent.value = data.fileContent;
    });

    return {
      fileContent,
      keywords,
      selectedText,
      highlightedText,
      highlightText,
      saveHighlightedKeywords,
      filterOptions,
      selectedOption,
      annotateTag,
      annotatingHistory,
    };
  },
};
</script>



<style scoped>
.annotation-tags p {
  font-size: 16px; 
  font-family: "Your Font Name", sans-serif;
  margin-bottom: 5px; 

}
.right-section {
  flex: 1;
  background-color: #f3f3f3;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 30%; 
  overflow-y: auto; 
  border-radius: 15px; 
  box-shadow: 0 0 30px rgba(176, 140, 220, 0.5); 
  border: 5px solid rgba(176, 140, 220, 0.5);
}

.search-bar select{
  width: 30%; 
  padding: 5px;
  font-size: 14px;
  background-color: lightpurple;

}

.text-labeling {
  display: flex;
  justify-content: space-between; 
  align-items: center;
  padding: 20px;
}

.text-display {
  flex: 2; 
}


.highlighted-text {
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #f7f7f7;
  border-radius: 5px;
  position: relative;
}

button.save-button {
  margin-top: 10px;
  padding: 10px 20px; /* 增大按钮大小 */
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 20px;
}

button.annotate-button {
  margin-top: 10px;
  padding: 10px 17px; /* 增大按钮大小 */
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 10px;
}


.keyword-list {
  flex: 1;
  padding-left: 20px;
}

.keyword-list ul {
  list-style: none;
  padding: 0;
}

.keyword-list li {
  margin-bottom: 5px;
  font-weight: bold;
}

.highlight {
  background-color: yellow;
}

.text-display p {
  white-space: pre-wrap;
}
</style>
