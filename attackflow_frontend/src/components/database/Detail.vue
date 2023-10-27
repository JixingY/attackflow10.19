<template>
  <div class="header">
    <div class="header-content">
      <img src="@/assets/images/Logo.png" alt="">
      <div class="centered-content">
        <span><strong>Attack Flow</strong></span>
        <button class="icon-button" title="Edit"><img src="@/assets/marker.png" alt="Edit Icon"></button>
        <button class="icon-button" title="Download"><img src="@/assets/download.png" alt="Download Icon"></button>
      </div>
    </div>
  </div>
  <div class="text-labeling">
    <div class="text-display">

      <div style="position: fixed;top: 100px;z-index: 999;">
        <button class="save-button" @click="openEditannotation">Edit annotation</button>
      </div>
      <div class="highlighted-text" @mouseup="highlightText" id="htext" style="margin-top: 120px;">
        <p v-html="highlightedText"></p>
      </div>
    </div>
    <div class="chatgpt-section" style="display: none;">
      <h2>ChatGPT Meta</h2>
      <textarea v-model="chatGPTResponse" readonly></textarea>
    </div>
    <div style="width: 500px;">
      <div style="width: 500px;" class="annotations-section">

        <h2>Annotations</h2>
        <ul>
          <li v-for="(item,index) in documentslist" :key="index" style="padding:10px;list-style: none;background: #edecec;">

            <div>
              <p>{{ item.referenced_text }}</p>
              <p style="margin-top: 10px;">
                <span style="background: rgb(43, 104, 236);
    padding: 5px;
    color: rgb(255, 255, 255);
    border-radius: 10px;"> {{ item.tags }}</span>

              </p>
            </div>

          </li>
        </ul>
      </div>
    </div>
    <div class="chatgpt-section" style="display: none;">
      <h2>ChatGPT Advice</h2>
      <textarea v-model="chatGPTResponse" readonly></textarea>
    </div>
    <div style="display: none;">
      <button class="save-button" @click="saveHighlightedKeywords">Save</button>

    </div>
    <br>


    <div class="keyword-list" style="display: none;">
      <h2>Keywords</h2>
      <ul>
        <li v-for="(keyword, index) in keywords" :key="index">{{ keyword }}</li>
      </ul>
    </div>
    <el-dialog title="Edit annotation" v-model="EditannotationVisible" width="40%">
      <el-form label-width="90px">
        <el-form-item label="referenced_text">
          <textarea v-model="form.referenced_text" style="width:40%;height: 200px;"></textarea>
        </el-form-item>
        <el-form-item label="tags">
          <el-select placeholder="Please select labels" v-model="huixianname" clearable @clear="handleClear"
            ref="selectUpResId" style="width:100%;">
            <el-option hidden :key="1"></el-option><!--这个必不可少否则显示不出来下拉数据-->
            <el-tree :data="rData" node-key="id" default-expand-all :props="defaultProps" :default-checked-keys="rNames"
              @check="handleNodeClick" show-checkbox ref="treeForm">
            </el-tree>
          </el-select>
        </el-form-item>

      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="EditannotationVisible = false">Cancel</el-button>
          <el-button type="primary" @click="saveadd">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted, reactive } from "vue";
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  props: {
    router: {
      type: Object,
    },
  },
  setup(props) {
    const route = useRoute();
    const filePath = ref(route.query.filePath || "");
    const document_no = ref(route.query.document_no || "");
    const document_id = ref(route.query.document_id || "");
    //const tags = ref(route.query.tags || "");
    const fileContent = ref("");
    const keywords = ref([]);
    const selectedText = ref("");
    const chatGPTResponse = ref("");
    const EditannotationVisible = ref(false);
    const annotations = ref([]);

    let form = reactive({
      referenced_text: "",
      document_no: "",
      uid: "",
      tags: "",
      path: "",
      document_id: ""
    });

    var huixianname = ref('');
    var huixianarr = ref([]);
    var ids = ref([]);

    const rData = ref([]);

    var rNames = ref([]);
    const documentslist = ref([])

    let form2 = reactive({
      id: document_id,
      document_no: document_no
    });


    const getTags = () => {

      axios.post('http://localhost:9999/tagslist')
        .then(res => {
          rData.value = res.data.tags;
          console.log(rData.value)

        })
        .catch(error => {
          //fail to login
        })

    };
    getTags();

    const saveadd = () => {
      const uid = localStorage.getItem("uid");
      form['document_no'] = document_no.value
      form['uid'] = uid
      form['tags'] = huixianname.value
      form['path'] = filePath.value
      form['document_id'] = document_id.value
      axios.post('http://localhost:9999/documents/addAnnotation', form)
        .then(res => {
          console.log(res.data.documents)
          EditannotationVisible.value = false;
          annotations.value = res.data.annotations
          console.log(annotations.value)
          //window.location.reload()

        })
        .catch(error => {
          //fail to login
        })
    };


    // 节点点击事件
    const handleNodeClick = (data, lst,) => {

      let arr = ref([]), name = ref([]);
      lst.checkedNodes.forEach(item => {//过滤拿到选中的deptName
        //console.log(item);
        name.value.push(item.name)
      });
      lst.checkedNodes.forEach(item => {//过滤拿到选中的name
        arr.value.push(item.id)

      });
      rNames.value = name
      ids.value = arr
      huixianname.value = JSON.stringify(name._value).replace(/(\")/g, "").replace("[", '').replace("]", '');

      console.log(huixianname.value);
    };
    const handleClear = () => {
      ids.value = '';
      ids2.value = '';
      huixianname.value = '';
      huixianname2.value = '';
    };

    async function askChatGPT() {
      try {
        const response = await axios.post('http://localhost:9999/chatgpt/ask', {
          // prompt: `Which is the largest country?`
          prompt: `give me the date of attack, threat actor and analyst name in json format from the information below, if the information is unknown then say unknown: ${fileContent.value}`
        });
        //console.log("ChatGPT response:", response.data);
        chatGPTResponse.value = response.data;
      } catch (error) {
        console.error('Error calling backend:', error);
      }
    }

    // 当组件加载时，请求文件内容
    onMounted(async () => {
      axios.post('http://localhost:9999/documents/documentsbyno', form2)
        .then(res => {
          //successfully login
          console.log(7777);
          documentslist.value = res.data.documents
          keywords.value = []
          //keyword.value = res.data.documents[0].referenced_text
          res.data.documents.forEach((item) => {
            keywords.value.push(item.referenced_text);
          });
          //keywords.value.push(documentslist.value.referenced_text);
          console.log(keywords.value);
        })
        .catch(error => {
          console.log(error);
        })
      const response = await fetch(`http://localhost:9999/upload/getFileContent?filePath=${filePath.value}`);
      const data = await response.json();
      fileContent.value = data.fileContent;
      askChatGPT();  // 自动获取答案
    });

    const highlightedText = computed(() => {
      // 高亮关键词
      let highlighted = fileContent.value; // 使用接收到的文件内容

      //keywords.value.push(documentslist.value.referenced_text);
      keywords.value.forEach((keyword) => {
        const regex = new RegExp(keyword, "g");
        highlighted = highlighted.replace(regex, '<span style="background:#FAE20F">' + keyword + '</span>');
      });
      return highlighted;
    });

    const highlightText = () => {
      // 高亮鼠标选中的文本
      //const selection = window.getSelection();
      //selectedText.value = selection.toString();
      var selectObj = window.getSelection();
      var changeText = selectObj.toString();
      var oldHtml = document.getElementById('htext').innerHTML;
      var newHtml = oldHtml.replace(changeText, '<span style="background:#FAE20F">' + changeText + '</span>');
      selectedText.value = changeText;
      form.referenced_text = changeText;
      document.getElementById('htext').innerHTML = newHtml;
    };

    const saveHighlightedKeywords = () => {
      // 保存鼠标选中的文本为关键词
      if (selectedText.value.trim() !== "") {
        keywords.value.push(selectedText.value);
        selectedText.value = "";
      }
    };

    const openEditannotation = () => {
      EditannotationVisible.value = true;
    };



    return {
      fileContent,
      keywords,
      selectedText,
      highlightedText,
      highlightText,
      saveHighlightedKeywords,
      chatGPTResponse,
      askChatGPT,
      EditannotationVisible,
      openEditannotation,
      form,
      defaultProps: {
        children: 'children',
        label: 'name',
        value: "id"
      },
      huixianname,
      handleClear, saveadd,
      rData, handleNodeClick, huixianarr, annotations, documentslist
    };
  },
};
</script>

<style scoped>
.annotations-section {
  margin-top: 100px;
  /* 调整此值以更改上边距 */
}

.header {
  display: flex;
  height: 80px;
  background: rgb(98, 29, 186);
  justify-content: left;
  align-items: center;
  cursor: pointer;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.header img {
  height: 60px;
}

.header-content {
  display: flex;
  align-items: center;
}

.header span {
  font-size: 30px;
  color: white;
}

.text-labeling {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  /*margin-top: 40px; */
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
  padding: 10px 20px;
  /* 增大按钮大小 */
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
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

.chatgpt-section {
  position: fixed;
  /* This makes it float */
  top: 20px;
  /* Adjust this value to set the distance from the top */
  right: 20px;
  /* Adjust this value to set the distance from the right side */
  z-index: 1001;
  /* This ensures it stays above other content */
  width: 300px;
  /* Adjust this value based on your preference */
  background-color: #fff;
  /* Giving it a background so the content below doesn't show through */
  border: 1px solid #ccc;
  /* Optional: gives a border to make it stand out */
  border-radius: 5px;
  /* Rounded corners */
  padding: 10px;
  /* Some padding for aesthetics */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Optional: adds a subtle shadow */
}


.chatgpt-section textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.chatgpt-section button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.icon-button {
  background-color: transparent;
  border: none;
  margin-left: 10px;
  cursor: pointer;
  width: 34px;
  /* Adjusted to 1/3 of assumed original size */
  height: 34px;
  /* Adjusted to 1/3 of assumed original size */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.icon-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.icon-button img {
  width: 100%;
  height: 100%;
}

.centered-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Just to ensure there is some space between the text and the buttons */
.centered-content span {
  margin-right: 10px;
}
</style>