import { API_URL } from "../config";
import { Contact } from "../models/contact";


export const getContacts = async () => {
  try {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
      const data = await response.json();
      return data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
}

export const getContactsById = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
      const data = await response.json();
      return data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
}

export const addContact = async (contact: Contact) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    console.log("Response Add:", response);
    if (response.status === 409) {
      return { error: "Contact already exists" };
    } else if (response.status === 400) {
      return { error: "Contact Details are Required" };
    }
  } catch (error) {
    console.error("Error adding contact:", error);
    throw error;
  }
}

export const editContact = async (contact: Contact) => {
  try {
    const response = await fetch(`${API_URL}/${contact.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    console.log("Response Edit:", response);
    if (response.status === 409) {
      return { error: "Contact already exists" };
    } else if (response.status === 400) {
      return { error: "Contact Details are Required" };
    }
    
  } catch (error) {
    console.error("Error editing contact:", error);
    throw error;
  }
}

export const deleteContact = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw error;
  }
}