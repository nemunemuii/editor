<template>
  <div class="editor-container">
    <bubble-menu
      :editor="editor"
      :tippy-options="{ duration: 50, placement: 'top-start' }"
      v-if="editor"
    >
      <div class="bubble-menu">
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
          aria-label="Bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="editor-icon"
          >
            <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
            <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
          </svg>
        </button>
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
          aria-label="Italic"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="editor-icon"
          >
            <line x1="19" y1="4" x2="10" y2="4"></line>
            <line x1="14" y1="20" x2="5" y2="20"></line>
            <line x1="15" y1="4" x2="9" y2="20"></line>
          </svg>
        </button>
        <button
          @click="editor.chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor.isActive('code') }"
          aria-label="Code"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="editor-icon"
          >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </button>
      </div>
    </bubble-menu>
    <editor-content :editor="editor" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { BubbleMenu, Editor, EditorContent } from "@tiptap/vue-3";
import { defaultExtensions } from "../config/tiptapExtensions";

const editor = ref(null);
const isEditable = ref(true);

onMounted(() => {
  editor.value = new Editor({
    extensions: defaultExtensions,
    content: `
      <hr />
<p>안녕하세요, 저는 허종호 입니다.

👋

</p>

<h2>프로젝트 소개 및 동기</h2>
<p>
  이 프로젝트는 <strong
    >'LLM이 생성하는 무한한 Markdown 콘텐츠를 어떻게 하면 가장 사용자 친화적으로
    보여주고 활용할 수 있을까?'</strong
  > 라는 질문에서 시작되었습니다. ChatGPT와 같은 생성형 AI가 실시간으로 서식을 적용해
  텍스트를 출력하는 모습에 깊은 인상을 받았고, AI가 생성한 정보를 사용자가 가장 편하게
  소비하고 편집할 수 있는 Markdown 에디터를 직접 구현해보고 싶었습니다.
</p>

<blockquote>Solving problems using computers not solving computer problems</blockquote>

<h2> ✨ 주요 기능 및 사용법 ✨ </h2>
<p>
  이 에디터는 <mark>직관적인 사용성을 목표</mark>로 합니다. 원하는 텍스트를 마우스로 드래그하여 선택하면, 텍스트 서식을 바로 변경할 수 있는 메뉴가 나타납니다. 메뉴를 통해 <strong>굵게</strong>, <em>기울임</em>, <code>코드</code> 스타일을 간편하게 적용해 보세요.
</p>
<p>
  또한, 마크다운 단축키를 그대로 사용할 수 있습니다. 키보드로 빠르게 문서를 편집해 보세요.
</p>
<ul>
  <li><code>**굵게**</code> 또는 <code>__굵게__</code> 입력 시: <strong>굵게</strong> 처리됩니다.</li>
  <li><code>*기울임*</code> 또는 <code>_기울임_</code> 입력 시: <em>기울임</em> 처리됩니다.</li>
  <li><code>인라인 코드</code> 입력 시: <code>인라인 코드</code>로 변환됩니다.</li>
  <li>줄 시작 부분에 <code>##</code> 입력 후 스페이스바를 누르면 헤더로 변환됩니다.</li>
</ul>

<h2>기술적 결정 및 아키텍처</h2>
<p>
  프로젝트의 확장성을 고려하여 초기 기술 스택 선정에 신중을 기했습니다. 초기
  로딩 속도와 쾌적한 사용성을 유지하기 위해 전체 페이지를 클라이언트에서
  렌더링하는 SPA 방식 대신 <mark>Astro의 Islands 아키텍처</mark>를
  채택했습니다.
</p>
<p>
  이를 통해 UI의 동적인 부분이 필요한 WYSIWYG 에디터만 <strong
    >Vue.js 컴포넌트(Island)로 분리하여 로드</strong
  >하고, 나머지 정적인 부분은 서버사이드 렌더링(SSR)으로 처리했습니다. 이
  아키텍처를 통해 <mark>성능과 사용자 경험을 모두 잡는 것</mark>을 목표로
  했습니다.
</p>

<h2>🌱 실패를 통한 성장 🌱 </h2>
<p>
  초기에는 WYSIWYG 에디터의 근본 원리를 이해하고자 <code>contenteditable</code> 속성과
  <code>Selection API</code> 같은 저수준(low-level) Web API를 직접 다루며 구현을
  시도했습니다. 이 과정은 쉽지 않았고, 복잡한 사용자 인터랙션과 브라우저 호환성을
  모두 처리하는 것에 대한 기술적 깊이를 절감하는 계기가 되었습니다.
</p>
<p>
  이 경험은 실패가 아닌, <strong
    >'왜 ProseMirror과 같은 전문 라이브러리가 필요한가'에 대한 근본적인 이해</strong
  >로 이어졌습니다. 직접 부딪혀본 덕분에 ProseMirror의 강력함과 Tiptap의
  추상화가 어떤 문제들을 해결해주는지 명확히 알 수 있었고, 이는 기술 선택의
  중요한 근거가 되었습니다.
</p>
<p>
  포기하는 대신 문제의 본질을 파고든 끝에 더 나은 해결책을 찾아냈고, 이 과정을
  통해 <mark>기술적 난관 앞에서 집요하게 해결책을 찾는 저의 강점</mark>을
  발견할 수 있었습니다.
</p>

<h2>마무리 및 앞으로의 다짐</h2>
<p>
  물론 UI/UX 디자인과 같이 아직 채워나가야 할 부분이 많다는 것을 알고 있습니다.
  하지만 저는 이처럼 스스로의 한계를 명확히 인지하고, 그것을 배움의 기회로 삼아 <mark
    >매일 끊임없이 성장하는 개발자</mark
  >입니다.
</p>
<p>
  프로그래밍을 통해 문제를 해결하는 과정 자체를 즐기며, 앞으로도 어떠한 기술적
  난관 앞에서도 포기하지 않고 해결책을 찾아 나아갈 자신이 있습니다.
</p>

     `,
    autofocus: 23,
    editable: isEditable.value,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none",
      },
    },
  });
});

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});

watch(isEditable, (value) => {
  if (editor.value) {
    editor.value.setEditable(value);
  }
});
</script>

<style>

.bubble-menu {
  display: flex;
  background-color: #343a40;
  padding: 0.25rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.bubble-menu button {
  border: none;
  background: none;
  color: #f8f9fa;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem;
  margin: 0 0.125rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bubble-menu button:hover {
  background-color: #495057;
}

.bubble-menu button.is-active {
  background-color: var(--color-primary);
  color: white;
}

.editor-icon {
  width: 1rem;
  height: 1rem;
}

.my-custom-highlight {
  color: #000000;
}

.tiptap p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

/* Basic editor styles */
.tiptap :first-child {
  margin-top: 0;
}

.tiptap pre {
  background: var(--black);
  border-radius: 0.5rem;
  color: var(--white);
  font-family: "JetBrainsMono", monospace;
  margin: 1.5rem 0;
  padding: 0.75rem 1rem;
}

.tiptap pre code {
  background: none;
  color: inherit;
  font-size: 1rem;
  padding: 0;
}

/* Code styling */
.tiptap pre .hljs-comment,
.tiptap pre .hljs-quote {
  color: #616161;
}

.tiptap pre .hljs-variable,
.tiptap pre .hljs-template-variable,
.tiptap pre .hljs-attribute,
.tiptap pre .hljs-tag,
.tiptap pre .hljs-name,
.tiptap pre .hljs-regexp,
.tiptap pre .hljs-link,
.tiptap pre .hljs-name,
.tiptap pre .hljs-selector-id,
.tiptap pre .hljs-selector-class {
  color: #f98181;
}

.tiptap pre .hljs-number,
.tiptap pre .hljs-meta,
.tiptap pre .hljs-built_in,
.tiptap pre .hljs-builtin-name,
.tiptap pre .hljs-literal,
.tiptap pre .hljs-type,
.tiptap pre .hljs-params {
  color: #fbbc88;
}

.tiptap pre .hljs-string,
.tiptap pre .hljs-symbol,
.tiptap pre .hljs-bullet {
  color: #8bc4f9;
}

.tiptap pre .hljs-title,
.tiptap pre .hljs-section {
  color: #000000;
}

.tiptap pre .hljs-keyword,
.tiptap pre .hljs-selector-tag {
  color: #70cff8;
}

.tiptap pre .hljs-emphasis {
  font-style: italic;
}

.tiptap pre .hljs-strong {
  font-weight: 700;
}
</style>
