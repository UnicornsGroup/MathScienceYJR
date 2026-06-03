/* math-science-yjr/assets/js/modules/form-renderer.js */
import { getDocument, addDocument } from '../../../firebase/firebase-config.js';

export async function renderForm(formId, containerId, successCallback = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `<div class="loader">Loading Form Layout...</div>`;

  try {
    const formSchema = await getDocument("forms", formId);

    if (!formSchema) {
      container.innerHTML = `<p class="error-msg">Form configuration not found.</p>`;
      return;
    }

    if (!formSchema.enabled) {
      container.innerHTML = `
        <div class="glass-card text-center" style="padding: 3rem 1.5rem;">
          <svg width="48" height="48" fill="none" stroke="var(--accent)" stroke-width="2" viewBox="0 0 24 24" style="margin: 0 auto 1.5rem auto;"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <h3 style="margin-bottom: 0.5rem;">Registrations Suspended</h3>
          <p class="text-muted">This form (${formSchema.formTitle}) is currently offline. Please check back later or contact the admin panel.</p>
        </div>
      `;
      return;
    }

    // Render Form
    container.innerHTML = '';
    
    const formTitle = document.createElement("h2");
    formTitle.style.marginBottom = "1.5rem";
    formTitle.style.fontSize = "1.75rem";
    formTitle.innerText = formSchema.formTitle;
    container.appendChild(formTitle);

    const formElement = document.createElement("form");
    formElement.id = `dynamic-form-${formId}`;
    formElement.className = "reveal active";

    // Sort fields by order
    const fields = [...formSchema.fields].sort((a, b) => a.order - b.order);

    fields.forEach(field => {
      const formGroup = document.createElement("div");
      formGroup.className = "form-group";

      const label = document.createElement("label");
      label.className = "form-label";
      label.htmlFor = field.id;
      label.innerHTML = `${field.label} ${field.required ? '<span style="color: #ef4444;">*</span>' : ''}`;
      formGroup.appendChild(label);

      let input;
      if (field.type === "textarea") {
        input = document.createElement("textarea");
        input.className = "form-control";
      } else if (field.type === "select") {
        input = document.createElement("select");
        input.className = "form-control";
        
        // Add placeholder option
        const placeholderOpt = document.createElement("option");
        placeholderOpt.value = "";
        placeholderOpt.innerText = `Select option...`;
        input.appendChild(placeholderOpt);

        if (field.options && Array.isArray(field.options)) {
          field.options.forEach(opt => {
            const optEl = document.createElement("option");
            optEl.value = opt;
            optEl.innerText = opt;
            input.appendChild(optEl);
          });
        }
      } else {
        input = document.createElement("input");
        input.type = field.type; // text, tel, email, date, number, etc.
        input.className = "form-control";
      }

      input.id = field.id;
      input.name = field.id;
      if (field.required) {
        input.required = true;
      }
      
      formGroup.appendChild(input);
      formElement.appendChild(formGroup);
    });

    // Add Submit Button
    const submitBtnContainer = document.createElement("div");
    submitBtnContainer.style.marginTop = "2rem";
    submitBtnContainer.innerHTML = `
      <button type="submit" class="btn btn-primary" style="width: 100%;">
        Submit Information
      </button>
    `;
    formElement.appendChild(submitBtnContainer);

    container.appendChild(formElement);

    // Form submission listener
    formElement.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const submitBtn = submitBtnContainer.querySelector("button");
      submitBtn.disabled = true;
      submitBtn.innerText = "Submitting Entry...";

      // Collect data
      const data = {};
      fields.forEach(field => {
        const el = document.getElementById(field.id);
        if (el) {
          data[field.id] = el.value;
        }
      });

      const payload = {
        formId: formId,
        data: data,
        status: "new",
        notes: ""
      };

      try {
        await addDocument("submissions", payload);
        
        // Show success card
        container.innerHTML = `
          <div class="glass-card text-center" style="padding: 4rem 2rem; border-color: rgba(34, 197, 94, 0.4);">
            <div class="flex-center" style="width: 60px; height: 60px; background-color: rgba(34, 197, 94, 0.1); border-radius: 50%; margin: 0 auto 1.5rem auto;">
              <svg width="32" height="32" fill="none" stroke="#22c55e" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
            </div>
            <h3 style="color: var(--text-dark); margin-bottom: 0.75rem;">Submission Successful!</h3>
            <p class="text-muted" style="margin-bottom: 2rem;">Thank you for registering. Our academic counseling staff will contact you shortly.</p>
            <a href="/index.html" class="btn btn-outline">Back to Home</a>
          </div>
        `;

        if (successCallback) {
          successCallback(data);
        }
      } catch (err) {
        console.error("Error submitting form: ", err);
        alert("Failed to submit entry. Please verify connection and try again.");
        submitBtn.disabled = false;
        submitBtn.innerText = "Submit Information";
      }
    });

  } catch (error) {
    console.error("Error drawing dynamic form: ", error);
    container.innerHTML = `<p class="error-msg">Could not initialize form renderer.</p>`;
  }
}
