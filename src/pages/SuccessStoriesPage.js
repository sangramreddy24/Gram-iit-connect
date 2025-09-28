import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function SuccessStoriesPage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStories() {
      try {
        const { data, error } = await supabase
          .from("success_stories")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setStories(data);
      } catch (err) {
        console.error("Error fetching stories:", err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStories();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>Loading Success Stories...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        All Success Stories
      </h1>

      {stories.length === 0 ? (
        <p style={{ textAlign: "center" }}>No stories available yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {stories.map((story) => (
            <div
              key={story.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            >
              {story.image_url && (
                <img
                  src={story.image_url}
                  alt={story.title}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              )}
              <div style={{ padding: "1rem" }}>
                <h3>{story.title}</h3>
                <p style={{ color: "#555" }}>{story.content}</p>
                <p style={{ fontStyle: "italic", marginTop: "0.5rem" }}>
                  — {story.author_name || "Anonymous"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SuccessStoriesPage;
