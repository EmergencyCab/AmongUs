import { createClient } from "@supabase/supabase-js";

// Your correct Supabase credentials
const supabaseUrl = "https://etbedrlxthgrtyrjygrw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0YmVkcmx4dGhncnR5cmp5Z3J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4ODgwNDMsImV4cCI6MjA2OTQ2NDA0M30.AZp9ZOFJLueFxfUx2jcfImRmy71idvYbUn7HecdyXQs";

export const supabase = createClient(supabaseUrl, supabaseKey);

// CRUD Operations for Crewmates

// Create a new crewmate
export const createCrewmate = async (crewmateData) => {
  try {
    const { data, error } = await supabase
      .from("crewmates")
      .insert([crewmateData])
      .select();

    if (error) {
      console.error("Error creating crewmate:", error);
      throw error;
    }
    return data[0];
  } catch (error) {
    console.error("Create crewmate error:", error);
    throw error;
  }
};

// Get all crewmates (sorted by creation date, newest first)
export const getAllCrewmates = async () => {
  try {
    const { data, error } = await supabase
      .from("crewmates")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching crewmates:", error);
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error("Get all crewmates error:", error);
    throw error;
  }
};

// Get a single crewmate by ID
export const getCrewmate = async (id) => {
  try {
    const { data, error } = await supabase
      .from("crewmates")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching crewmate:", error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Get crewmate error:", error);
    throw error;
  }
};

// Update a crewmate
export const updateCrewmate = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from("crewmates")
      .update(updates)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating crewmate:", error);
      throw error;
    }
    return data[0];
  } catch (error) {
    console.error("Update crewmate error:", error);
    throw error;
  }
};

// Delete a crewmate
export const deleteCrewmate = async (id) => {
  try {
    const { error } = await supabase.from("crewmates").delete().eq("id", id);

    if (error) {
      console.error("Error deleting crewmate:", error);
      throw error;
    }
    return true;
  } catch (error) {
    console.error("Delete crewmate error:", error);
    throw error;
  }
};
