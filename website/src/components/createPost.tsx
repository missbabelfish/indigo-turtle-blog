import React, { useContext, useState } from 'react';
import { ThemeProvider, createTheme, useTheme } from '@mui/material';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { myContext } from 'components/Context';

const navigate = useNavigate();

interface FormData {
  postAuthor: string,
  postTitle: string;
  postContent: string;
  tags: string[];
}

const initialFormData: FormData = {
  postAuthor: '',
  postTitle: '',
  postContent: '',
  tags: [],
};

const handleInputChange = (
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
  formData: FormData,
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
): void => {
  const { name, value } = event.target;
  setFormData({ ...formData, [name]: value });
};

const handleSelectChange = (
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
  formData: FormData,
  event: React.ChangeEvent<HTMLSelectElement>
): void => {
  const options = event.target.options;
  const selectedOptions: string[] = [];
  for (let i = 0; i < options.length; i++) {
    if (options[i].selected) {
      selectedOptions.push(options[i].value);
    }
  }
  setFormData({ ...formData, tags: selectedOptions });
};

function CreatePost(): JSX.Element {
  const ctx = useContext(myContext)
  // redirect to root if not logged in
  if (ctx.username === undefined) navigate ("/")

  // use materialUI theme
  const theme = useTheme();
  
  // set form state
  const [formData, setFormData] = useState<FormData>(initialFormData);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    // Prevent the browser from reloading the page
    event.preventDefault();

    // Read the form data
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    // pass formData as a fetch body directly:
    // fetch('/some-api', { method: form.method, body: formData }): void;
  }

  function handleCancel(): void {
    navigate ("/postspage")
  }

  return (
    <form 
      method="post" 
      onSubmit={handleSubmit}
      // style={{theme}}
    >
      <label>
        Title:
        <input
          name="postTitle"
          defaultValue="Title"
          value={formData.postTitle}
          onChange={handleInputChange.bind(null, setFormData, formData)}
        />
      </label>
      <label>
        Edit your post:
        <textarea
          name="postContent"
          placeholder="deep thoughts"
          rows={4}
          cols={40}
          value={formData.postContent}
          onChange={handleInputChange.bind(null, setFormData, formData)}
        />
      </label>
      <label>
        Select post tags:
        <select
          name="tags"
          id="tags"
          multiple
          required
          value={formData.tags}
          onChange={handleSelectChange.bind(null, setFormData, formData)}
        >
          <option value="travel">Travel</option>
          <option value="cooking">Cooking</option>
          <option value="hobbies">Hobbies</option>
          <option value="music">Music</option>
          <option value="career">Career</option>
          <option value="programming">Programming</option>
        </select>
      </label>
      <p className="tagDisplay"></p>
      <hr />
      <button onClick={handleCancel}>Cancel</button>
      <button type="submit">Submit</button>
    </form>
  );
}

export { CreatePost };
