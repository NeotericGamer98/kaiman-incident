(function () {
    'use strict';

    // --- Testimonial Form ---
    const testimonialForm = document.getElementById('testimonial-form');
    const formSuccess = document.getElementById('form-success');

    if (testimonialForm) {
        testimonialForm.addEventListener('submit', function (e) {
            e.preventDefault();
            testimonialForm.reset();
            testimonialForm.style.display = 'none';
            if (formSuccess) {
                formSuccess.style.display = 'block';
            }
        });
    }

    // --- Comment Form ---
    const commentForm = document.getElementById('comment-form');
    const commentsSection = document.querySelector('.comments-section .container');

    if (commentForm) {
        commentForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const author = document.getElementById('comment-author').value.trim();
            const text = document.getElementById('comment-text').value.trim();

            if (!author || !text) return;

            const today = new Date();
            const dateStr = today.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });

            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment';
            commentDiv.innerHTML =
                '<div class="comment-header">' +
                    '<span class="comment-author">' + escapeHtml(author) + '</span>' +
                    '<span class="comment-date">' + dateStr + '</span>' +
                '</div>' +
                '<p class="comment-body">' + escapeHtml(text) + '</p>';

            const wrap = document.querySelector('.comment-form-wrap');
            if (wrap) {
                wrap.parentNode.insertBefore(commentDiv, wrap);
            }

            commentForm.reset();

            // Update comment count
            const badge = document.querySelector('.badge');
            if (badge) {
                const countEls = document.querySelectorAll('.comment');
                const match = badge.textContent.match(/\d+/);
                if (match) {
                    const newCount = parseInt(match[0], 10) + 1;
                    badge.textContent = newCount + ' Comments';
                }
            }
        });
    }

    // --- Evidence Viewer ---
    const evidenceData = {
        'incident-report-01': {
            title: 'Exhibit A &mdash; Incident Report',
            body: '<h4>INCIDENT REPORT &mdash; FURNAL EQUINOX 2025</h4>' +
                  '<p><strong>Date of Incident:</strong> March 21, 2025</p>' +
                  '<p><strong>Location:</strong> Men\'s Bathroom, Convention Center, Toronto, ON</p>' +
                  '<p><strong>Reporting Party:</strong> Victim A</p>' +
                  '<p><strong>Subject:</strong> Kaiman (Crocodile/Wolf Hybrid)</p>' +
                  '<hr>' +
                  '<p><strong>Description of Incident:</strong></p>' +
                  '<p>At approximately 3:45 PM EST, Victim A was washing their paws at the sink area of the men\'s bathroom. The subject, Kaiman, approached from behind and made physical contact with the lower back region of Victim A, specifically in the area commonly referred to as the "small of the back." Contact lasted approximately 2-3 seconds.</p>' +
                  '<p>Victim A reported feeling "startled" and "uncomfortable." The subject did not verbalize anything before or after the contact and exited the bathroom immediately.</p>' +
                  '<p><strong>Convention Staff Action:</strong> Verbal warning issued to subject. No formal ban recorded.</p>'
        },
        'telegram-screenshots': {
            title: 'Exhibit B &mdash; Telegram Screenshots',
            body: '<h4>TELEGRAM CHAT LOGS &mdash; ARCHIVED</h4>' +
                  '<p><strong>Date Range:</strong> December 10&ndash;15, 2025</p>' +
                  '<p><strong>Chat:</strong> "FurCon Drama (Private)"</p>' +
                  '<hr>' +
                  '<p><strong>[Kaiman]:</strong> Can\'t believe people are still talking about this</p>' +
                  '<p><strong>[Kaiman]:</strong> It was ONE TIME and it was an accident</p>' +
                  '<p><strong>[User926]:</strong> multiple people have come forward now though</p>' +
                  '<p><strong>[Kaiman]:</strong> these are fake victims lol</p>' +
                  '<p><strong>[Kaiman]:</strong> they just want attention</p>' +
                  '<p><strong>[Kaiman]:</strong> the small of the back is not even a real body part</p>' +
                  '<p><strong>[User413]:</strong> it is though? it\'s literally a named area</p>' +
                  '<p><strong>[Kaiman]:</strong> you guys are overreacting</p>' +
                  '<hr>' +
                  '<p><em>Note: These logs have been authenticated by the CrocWolf Law Group Digital Forensics Division.</em></p>'
        },
        'staff-statements': {
            title: 'Exhibit C &mdash; Convention Staff Statements',
            body: '<h4>SWORN STATEMENTS &mdash; CONVENTION STAFF</h4>' +
                  '<p><strong>Statement 1 &mdash; Security Volunteer "M."</strong></p>' +
                  '<p>"I was stationed near the bathroom entrance during Furnal Equinox 2025. A distressed attendee approached me and reported being touched inappropriately by someone matching Kaiman\'s description. I noted the report in my log but did not witness the incident firsthand."</p>' +
                  '<hr>' +
                  '<p><strong>Statement 2 &mdash; Staff Member "J."</strong></p>' +
                  '<p>"At Midwest FurFest 2025, I overheard two attendees discussing an incident in the bathroom involving a croc-wolf hybrid. When I approached, one of them said, \'He touched my friend\'s back without asking.\' I advised them to file a formal complaint."</p>' +
                  '<hr>' +
                  '<p><em>All statements collected under convention protocol.</em></p>'
        },
        'pattern-analysis': {
            title: 'Exhibit D &mdash; Pattern Analysis Report',
            body: '<h4>PATTERN ANALYSIS &mdash; THE CROCWOLF LAW GROUP</h4>' +
                  '<p><strong>Prepared by:</strong> Senior Case Analyst Team</p>' +
                  '<p><strong>Date:</strong> April 2026</p>' +
                  '<hr>' +
                  '<h4>FINDINGS</h4>' +
                  '<p><strong>1. Location Consistency:</strong> 100% of reported incidents occurred in convention bathroom facilities. This suggests a targeted hunting ground where victims are isolated and less likely to create a scene.</p>' +
                  '<p><strong>2. Time of Day:</strong> All incidents occurred during peak convention hours (2PM&ndash;5PM) when bathrooms are moderately trafficked.</p>' +
                  '<p><strong>3. Targeting Pattern:</strong> All victims were known associates or acquaintances of the defendant, suggesting a breach of social trust rather than random contact.</p>' +
                  '<p><strong>4. Body Part Specificity:</strong> The "small of the back" was the contact zone in every reported incident. This specificity suggests deliberate targeting of an area often ambiguously regarded in consent discussions.</p>' +
                  '<hr>' +
                  '<p><strong>Conclusion:</strong> A clear and consistent pattern of behavior has been established.</p>'
        },
        'defendant-statements': {
            title: 'Exhibit E &mdash; Defendant\'s Public Statements',
            body: '<h4>PUBLIC STATEMENTS &mdash; KAIMAN (DEFENDANT)</h4>' +
                  '<p><strong>Source:</strong> Telegram, Twitter, Convention Forums</p>' +
                  '<p><strong>Date Range:</strong> March 2025 &ndash; April 2026</p>' +
                  '<hr>' +
                  '<p><strong>Statement 1 (Telegram, April 2026):</strong></p>' +
                  '<p>"These people are fake victims. I never touched anyone. This is all a smear campaign."</p>' +
                  '<p><strong>Statement 2 (Twitter, April 2026):</strong></p>' +
                  '<p>"The small of the back is a neutral zone. Like a handshake. You don\'t need consent for a handshake."</p>' +
                  '<p><strong>Statement 3 (FurCon Forum, April 2026):</strong></p>' +
                  '<p>"I\'m the real victim here. I can\'t even go to conventions anymore without being accused of something. My reputation is destroyed."</p>' +
                  '<hr>' +
                  '<p><em>All statements are public and preserved as evidence of the defendant\'s position.</em></p>'
        }
    };

    const viewer = document.getElementById('evidence-viewer');
    const viewerTitle = document.getElementById('viewer-title');
    const viewerBody = document.getElementById('viewer-body');
    const viewerClose = document.getElementById('viewer-close');

    document.querySelectorAll('.btn-download').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var key = this.getAttribute('data-file');
            var data = evidenceData[key];
            if (data && viewer && viewerTitle && viewerBody) {
                viewerTitle.innerHTML = data.title;
                viewerBody.innerHTML = data.body;
                viewer.style.display = 'block';
                viewer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    if (viewerClose && viewer) {
        viewerClose.addEventListener('click', function () {
            viewer.style.display = 'none';
        });
    }

    // --- Helpers ---
    function escapeHtml(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

})();
