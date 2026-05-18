(function () {
    'use strict';

    // --- Dark Mode Toggle ---
    (function initTheme() {
        var saved = localStorage.getItem('kaiman-theme');
        if (saved === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        var btn = document.getElementById('theme-toggle');
        if (btn) {
            btn.addEventListener('click', function () {
                var html = document.documentElement;
                var isDark = html.getAttribute('data-theme') === 'dark';
                if (isDark) {
                    html.removeAttribute('data-theme');
                    localStorage.setItem('kaiman-theme', 'light');
                    btn.textContent = '\u263E Dark';
                } else {
                    html.setAttribute('data-theme', 'dark');
                    localStorage.setItem('kaiman-theme', 'dark');
                    btn.textContent = '\u2600 Light';
                }
            });
            // Set button text based on current theme
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                btn.textContent = '\u2600 Light';
            } else {
                btn.textContent = '\u263E Dark';
            }
        }
    })();

    // --- Testimonial Form ---
    var testimonialForm = document.getElementById('testimonial-form');
    var formSuccess = document.getElementById('form-success');

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
    var commentForm = document.getElementById('comment-form');
    var commentsContainer = document.getElementById('comments-container');

    if (commentForm) {
        commentForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var author = document.getElementById('comment-author').value.trim();
            var text = document.getElementById('comment-text').value.trim();

            if (!author || !text) return;

            var today = new Date();
            var dateStr = today.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });

            var commentDiv = document.createElement('div');
            commentDiv.className = 'comment';
            commentDiv.innerHTML =
                '<div class="comment-header">' +
                    '<span class="comment-author">' + escapeHtml(author) + '</span>' +
                    '<span class="comment-date">' + dateStr + '</span>' +
                '</div>' +
                '<p class="comment-body">' + escapeHtml(text) + '</p>';

            if (commentsContainer) {
                commentsContainer.appendChild(commentDiv);
            } else {
                var wrap = document.querySelector('.comment-form-wrap');
                if (wrap) {
                    wrap.parentNode.insertBefore(commentDiv, wrap);
                }
            }

            commentForm.reset();

            var badge = document.querySelector('.badge');
            if (badge) {
                var totalComments = document.querySelectorAll('.comment').length;
                badge.textContent = totalComments + ' Comments';
            }
        });
    }

    // --- Evidence Viewer ---
    var evidenceData = {
        'incident-report-01': {
            title: 'Exhibit A &mdash; Incident Report (FWA)',
            body: '<h4>INCIDENT REPORT &mdash; FWA 2025</h4>' +
                  '<p><strong>Date of Incident:</strong> January 2025</p>' +
                  '<p><strong>Location:</strong> Men\'s Bathroom, Convention Center, Florida</p>' +
                  '<p><strong>Reporting Party:</strong> Victim A</p>' +
                  '<p><strong>Subject:</strong> Kaiman (Crocodile/Grey Wolf Hybrid)</p>' +
                  '<hr>' +
                  '<p><strong>Description of Incident:</strong></p>' +
                  '<p>At approximately 4:15 PM EST, Victim A was adjusting their fursuit head near the sink area when the subject, Kaiman, approached from behind and made physical contact with the lower back region, specifically in the area commonly known as the "small of the back." Contact lasted approximately 3 seconds.</p>' +
                  '<p>Victim A reported feeling "startled" and "uncomfortable." The subject did not verbalize anything before or after the contact and exited the bathroom promptly.</p>' +
                  '<p><strong>Convention Staff Action:</strong> Verbal warning issued. Subject claimed it was an accident.</p>' +
                  '<hr>' +
                  '<p><em>Exhibit marked for identification.</em></p>'
        },
        'telegram-screenshots': {
            title: 'Exhibit B &mdash; Telegram Screenshots',
            body: '<h4>TELEGRAM CHAT LOGS &mdash; ARCHIVED</h4>' +
                  '<p><strong>Date Range:</strong> December 10&ndash;15, 2025</p>' +
                  '<p><strong>Chat:</strong> "FurCon Drama (Private)"</p>' +
                  '<hr>' +
                  '<p><strong>[Kaiman]:</strong> can\'t believe people are still talking about this</p>' +
                  '<p><strong>[Kaiman]:</strong> it was ONE TIME at FWA and it was an accident</p>' +
                  '<p><strong>[BloodDonor]:</strong> you touched my back without asking dude</p>' +
                  '<p><strong>[Kaiman]:</strong> the small of the back is a consensual zone</p>' +
                  '<p><strong>[User926]:</strong> multiple people have come forward now though. MFF too</p>' +
                  '<p><strong>[Kaiman]:</strong> these are fake victims lol they just want attention</p>' +
                  '<p><strong>[Kaiman]:</strong> the small of the back is not even a real body part</p>' +
                  '<p><strong>[User413]:</strong> it is though? it\'s literally a named anatomical area</p>' +
                  '<p><strong>[Kaiman]:</strong> you guys are overreacting. i went to Georgia Tech i know anatomy</p>' +
                  '<p><strong>[BloodDonor]:</strong> i have trauma from this. i can\'t use convention bathrooms anymore</p>' +
                  '<p><strong>[Kaiman]:</strong> skill issue</p>' +
                  '<hr>' +
                  '<p><em>Note: These logs have been authenticated by the Meowfurshot Law Group Digital Forensics Division.</em></p>'
        },
        'staff-statements': {
            title: 'Exhibit C &mdash; Convention Staff Statements',
            body: '<h4>SWORN STATEMENTS &mdash; CONVENTION STAFF</h4>' +
                  '<p><strong>Statement 1 &mdash; MFF Security Volunteer "M."</strong></p>' +
                  '<p>"I was stationed near the bathroom entrance during Midwest FurFest 2025. A distressed attendee approached me and reported being touched inappropriately by someone matching Kaiman\'s description. I noted the report in my log but did not witness the incident firsthand."</p>' +
                  '<hr>' +
                  '<p><strong>Statement 2 &mdash; FWA Staff Member "J."</strong></p>' +
                  '<p>"At FWA 2025, I overheard two attendees discussing an incident in the bathroom involving a croc-wolf hybrid. When I approached, one of them said, \'He touched my friend\'s back without asking.\' I advised them to file a formal complaint. One of the victims was named BloodDonor."</p>' +
                  '<hr>' +
                  '<p><strong>Statement 3 &mdash; Unaffiliated Third Party "T."</strong></p>' +
                  '<p>"I was in the stall next to them. I heard everything. There was definitely touching. Sounded like it was the small of the back specifically."</p>' +
                  '<hr>' +
                  '<p><em>All statements collected under convention protocol.</em></p>'
        },
        'pattern-analysis': {
            title: 'Exhibit D &mdash; Pattern Analysis Report',
            body: '<h4>PATTERN ANALYSIS &mdash; MEOWFURSHOT LAW GROUP</h4>' +
                  '<p><strong>Prepared by:</strong> Senior Case Analyst Team</p>' +
                  '<p><strong>Date:</strong> April 2026</p>' +
                  '<hr>' +
                  '<h4>FINDINGS</h4>' +
                  '<p><strong>1. Location Consistency:</strong> 100% of reported incidents occurred in convention bathroom facilities across three different conventions (FWA, MFF, MegaPlex). This suggests a targeted pattern of behavior.</p>' +
                  '<p><strong>2. Time of Day:</strong> All incidents occurred during peak convention hours (2PM&ndash;5PM) when bathrooms are moderately trafficked.</p>' +
                  '<p><strong>3. Targeting Pattern:</strong> Victims were known associates of the defendant, including one identified as "BloodDonor," suggesting a breach of social trust rather than random contact.</p>' +
                  '<p><strong>4. Body Part Specificity:</strong> The "small of the back" was the contact zone in every reported incident. The defendant has publicly claimed this is a "consensual zone."</p>' +
                  '<p><strong>5. Defendant Profile:</strong> Kaiman, a Crocodile/Grey Wolf hybrid, age 26, from the Midwestern United States. Georgia Tech graduate (BS Computer Science, Intelligence &amp; Media). Active content creator on Twitch and YouTube. Has demonstrated knowledge of anatomy but refuses to apply it to consent discussions.</p>' +
                  '<hr>' +
                  '<p><strong>Conclusion:</strong> A clear and consistent pattern of behavior has been established across multiple conventions.</p>'
        },
        'defendant-statements': {
            title: 'Exhibit E &mdash; Defendant\'s Public Statements',
            body: '<h4>PUBLIC STATEMENTS &mdash; KAIMAN (DEFENDANT)</h4>' +
                  '<p><strong>Source:</strong> Telegram, Twitter/Bluesky, kaiman.blue</p>' +
                  '<p><strong>Date Range:</strong> January 2025 &ndash; April 2026</p>' +
                  '<hr>' +
                  '<p><strong>Statement 1 (Telegram, January 2025):</strong></p>' +
                  '<p>"It was an accident. I was just trying to get to the sink."</p>' +
                  '<p><strong>Statement 2 (Telegram, December 2025):</strong></p>' +
                  '<p>"These people are fake victims. I never touched anyone. This is all a smear campaign because I went to Georgia Tech and they didn\'t."</p>' +
                  '<p><strong>Statement 3 (Bluesky, April 2026):</strong></p>' +
                  '<p>"The small of the back is a neutral zone. Like a handshake. You don\'t need consent for a handshake. I have a CS degree from Georgia Tech, I know what I\'m talking about."</p>' +
                  '<p><strong>Statement 4 (kaiman.blue blog comment, April 2026):</strong></p>' +
                  '<p>"I\'m the real victim here. I can\'t even go to conventions anymore without being accused of something. My Twitch stream numbers are down 40%. Think about that."</p>' +
                  '<p><strong>Statement 5 (kaiman.blue, "Hey guys!" blog post):</strong></p>' +
                  '<p>"Your favorite neighborhood hybrid has a home of their own now!" &mdash; Referring to their new website launched January 2026, which coincidentally was after the first FWA incident.</p>' +
                  '<hr>' +
                  '<p><em>All statements are public and preserved as evidence of the defendant\'s position.</em></p>'
        }
    };

    var viewer = document.getElementById('evidence-viewer');
    var viewerTitle = document.getElementById('viewer-title');
    var viewerBody = document.getElementById('viewer-body');
    var viewerClose = document.getElementById('viewer-close');

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

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

})();
