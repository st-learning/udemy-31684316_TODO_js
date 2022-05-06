import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";
  createIncompleteList(inputText);
};

// 未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
  // liタグ生成
  const litag = document.createElement("li");

  // divタグ生成
  const divtag = document.createElement("div");
  divtag.className = "list-row";

  // pタグ作成
  const ptag = document.createElement("p");
  ptag.innerText = text;

  // 未完了のリストに追加
  document.getElementById("incomplete-list").appendChild(litag);

  // 完了ボタン作成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 押された完了ボタンの親タグを完了TODOのリストに追加
    // 完了リストに追加するテキストを取得
    const addTarget = completeButton.parentNode;
    const text = addTarget.firstElementChild.innerText;

    // 未完了リストから削除
    const completeTarget = completeButton.parentNode.parentNode;
    deleteFromIncompleteList(completeTarget);
    document.getElementById("complete-list").appendChild(completeTarget);

    // li以下を初期化
    addTarget.textContent = null;

    // pタグを生成
    const ptag = document.createElement("p");
    ptag.innerText = text;
    // 戻すボタン作成
    const undoButton = document.createElement("button");
    undoButton.innerText = "戻す";
    undoButton.addEventListener("click", () => {
      // 押された戻すボタンの親タグを完了リストから削除
      const deleteTarget = undoButton.parentNode.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);
      // テキスト取得
      const text = undoButton.parentElement.firstElementChild.innerText;
      createIncompleteList(text);
    });

    litag.appendChild(divtag);
    divtag.appendChild(ptag);
    divtag.appendChild(undoButton);
  });

  // 削除ボタン作成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの親タグを未完了リストから削除
    const deleteTarget = deleteButton.parentNode.parentNode;
    deleteFromIncompleteList(deleteTarget);
  });

  // liタグの子要素に各要素を設定
  litag.appendChild(divtag);
  divtag.appendChild(ptag);
  divtag.appendChild(completeButton);
  divtag.appendChild(deleteButton);
};

document
  .getElementById("addButton")
  .addEventListener("click", () => onClickAdd());
