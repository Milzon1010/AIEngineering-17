document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('main-title').textContent = data.title;
            const contentDiv = document.getElementById('content');

            data.sections.forEach(section => {
                const sectionDiv = document.createElement('div');
                sectionDiv.classList.add('section');

                const sectionTitle = document.createElement('h2');
                sectionTitle.textContent = section.title;
                sectionDiv.appendChild(sectionTitle);

                section.content.forEach(paragraph => {
                    const p = document.createElement('p');
                    p.innerHTML = paragraph;
                    sectionDiv.appendChild(p);
                });

                if (section.examples_title) {
                    const examplesTitle = document.createElement('h3');
                    examplesTitle.textContent = section.examples_title;
                    sectionDiv.appendChild(examplesTitle);
                    const ul = document.createElement('ul');
                    section.examples.forEach(example => {
                        const li = document.createElement('li');
                        li.innerHTML = example;
                        ul.appendChild(li);
                    });
                    sectionDiv.appendChild(ul);
                }

                if (section.sub_section) {
                    const subSection = section.sub_section;
                    const subSectionTitle = document.createElement('h3');
                    subSectionTitle.textContent = subSection.title;
                    sectionDiv.appendChild(subSectionTitle);

                    const subSectionContent = document.createElement('p');
                    subSectionContent.innerHTML = subSection.content;
                    sectionDiv.appendChild(subSectionContent);

                    if (subSection.layers_title) {
                        const layersTitle = document.createElement('h4');
                        layersTitle.textContent = subSection.layers_title;
                        sectionDiv.appendChild(layersTitle);

                        subSection.layers.forEach(layer => {
                            const layerName = document.createElement('h5');
                            layerName.textContent = layer.name;
                            sectionDiv.appendChild(layerName);

                            const layerDesc = document.createElement('p');
                            layerDesc.innerHTML = layer.description;
                            sectionDiv.appendChild(layerDesc);

                            const layerAnalogy = document.createElement('p');
                            layerAnalogy.innerHTML = layer.analogy;
                            sectionDiv.appendChild(layerAnalogy);
                        });
                    }
                }

                if (section.steps) {
                    section.steps.forEach(step => {
                        const stepName = document.createElement('h3');
                        stepName.textContent = step.name;
                        sectionDiv.appendChild(stepName);

                        const stepDesc = document.createElement('p');
                        stepDesc.innerHTML = step.description;
                        sectionDiv.appendChild(stepDesc);

                        if (step.tasks) {
                            const ul = document.createElement('ul');
                            step.tasks.forEach(task => {
                                const li = document.createElement('li');
                                li.innerHTML = task;
                                ul.appendChild(li);
                            });
                            sectionDiv.appendChild(ul);
                        }

                        if (step.code) {
                            const pre = document.createElement('pre');
                            const code = document.createElement('code');
                            code.textContent = step.code;
                            pre.appendChild(code);
                            sectionDiv.appendChild(pre);
                        }
                    });
                }

                contentDiv.appendChild(sectionDiv);
            });
        })
        .catch(error => console.error('Error loading the data:', error));
});
