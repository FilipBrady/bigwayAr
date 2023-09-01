import { View, Text } from 'react-native';
import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const PcWelcomeScreen = () => {
  const editorRef = useRef(null);
  const [formData, setFormData] = useState({
    description: '<p>This is the initial content of the editor.</p>',
  });

  const handleEditorChange = (content: any) => {
    setFormData({ ...formData, description: content });
  };
  return (
    <View>
      <>
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue='<p>This is the initial content of the editor.</p>'
          apiKey='a1aaxu222eei4qv3dlhb99s2mqhql9zeieq0v6m2os96wqvc'
          init={{
            height: 500,
            width: 500,
            menubar: true,
            plugins:
              'advlist autolink lists link image charmap preview anchor ' +
              'searchreplace visualblocks code fullscreen ' +
              'insertdatetime media table code help wordcount',
            toolbar:
              'undo redo | formatselect | ' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style:
              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
          value={formData.description}
          onEditorChange={content => setFormData({ description: content })}
        />
        <button onClick={() => console.log(formData.description)}>
          Log editor content
        </button>
      </>
    </View>
  );
};

export default PcWelcomeScreen;
