import React from 'react';
import { useState } from 'react';
import Markdown from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new Markdown();

export default function Editor(){
    const [content, setContent] = useState('');

    const handleEditorChange = ({ html, text }) => {
        setContent(text);
    };

    return(
        <div className="max-w-4xl mx-auto mt-10 p-4 bg-white rounded shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Write Your Blog Post</h1>
            <MdEditor
            value={content}
            style={{ height: '500px' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            />
        </div>
    );
}