/*
 * Copyright 2020 CustomBlog
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.pde.blog.web.screens.publication;

import com.haulmont.cuba.core.global.DataManager;
import com.haulmont.cuba.gui.ScreenBuilders;
import com.haulmont.cuba.gui.components.Action;
import com.haulmont.cuba.gui.screen.*;
import com.haulmont.cuba.security.global.UserSession;
import com.pde.blog.entity.Author;
import com.pde.blog.entity.Publication;
import jdk.internal.jline.internal.Nullable;

import javax.inject.Inject;

@UiController("blog_Publication.browse")
@UiDescriptor("publication-browse.xml")
@LookupComponent("publicationsTable")
@LoadDataBeforeShow
public class PublicationBrowse extends StandardLookup<Publication> {

    @Inject
    private UserSession userSession;
    @Inject
    private ScreenBuilders screenBuilders;
    @Inject
    private DataManager dataManager;

    @Subscribe("publicationsTable.create")
    public void onEdit(Action.ActionPerformedEvent event) {
        Author currentAuthor = getCurrentAuthor();
        if(currentAuthor == null) return;

        PublicationEdit editor = screenBuilders.editor(Publication.class, this)
                .withScreenClass(PublicationEdit.class)
                .build();

        editor.setAuthor(currentAuthor);
        editor.show();
    }

    @Nullable
    protected Author getCurrentAuthor() {
        return dataManager.load(Author.class)
                .query("select a " +
                        "from blog_Author a " +
                        "where a.user = :currentUser ")
                .parameter("currentUser", userSession.getCurrentOrSubstitutedUser())
                .optional().orElse(null);
    }
}