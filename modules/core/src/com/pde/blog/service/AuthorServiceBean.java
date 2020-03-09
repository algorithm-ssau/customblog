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

package com.pde.blog.service;

import com.haulmont.bali.util.Preconditions;
import com.haulmont.cuba.core.global.DataManager;
import com.haulmont.cuba.core.global.TimeSource;
import com.haulmont.cuba.core.global.UserSessionSource;
import com.haulmont.cuba.security.entity.User;
import com.pde.blog.entity.Author;
import com.pde.blog.entity.Publication;
import jdk.internal.jline.internal.Nullable;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

@Service(AuthorService.NAME)
public class AuthorServiceBean implements AuthorService {

    @Inject
    private UserSessionSource userSessionSource;
    @Inject
    private TimeSource timeSource;
    @Inject
    private DataManager dataManager;

    @Override
    public List<Publication> getVisiblePublications(Author author) {
        Preconditions.checkNotNullArgument(author);

        return dataManager.load(Publication.class)
                .query("select p " +
                        "from blog_Publication p " +
                        "where p.author = :author " +
                        "   and p.releaseDate <= :currentTime " +
                        "   and p.visible = true " +
                        "   and p.author.banned = false")
                .parameter("author", author)
                .parameter("currentTime", timeSource.currentTimestamp())
                .view("publication-rest-preview")
                .list();
    }

    @Override
    public List<Publication> getAllPublications(Author author) {
        Preconditions.checkNotNullArgument(author);

        User user = userSessionSource.getUserSession().getCurrentOrSubstitutedUser();
        if (!user.getId().equals(author.getUser().getId())) {
            return getVisiblePublications(author);
        }

        return dataManager.load(Publication.class)
                .query("select p " +
                        "from blog_Publication p " +
                        "where p.author = :author")
                .parameter("author", author)
                .view("publication-rest-preview")
                .list();

    }

    @Nullable
    @Override
    public Boolean isBanned(Author author) {
        Preconditions.checkNotNullArgument(author);

        return dataManager.loadValue("select a.banned " +
                "from blog_Author a " +
                "where a = :author", Boolean.class)
                .parameter("author", author)
                .optional().orElse(null);
    }

    @Nullable
    @Override
    public String getAvatarUrl(Author author) {
        Preconditions.checkNotNullArgument(author);

        return dataManager.loadValue("select a.avatarUrl " +
                "from blog_Author a " +
                "where a = :author", String.class)
                .parameter("author", author)
                .optional().orElse(null);
    }

    @Override
    public Author updateAuthor(Author author) {
        Preconditions.checkNotNullArgument(author);

        return dataManager.reload(author, "author-rest-full");
    }

    @Nullable
    @Override
    public Author getAuthor(Publication publication) {
        Preconditions.checkNotNullArgument(publication);

        return dataManager.load(Author.class)
                .query("select p.author " +
                        "from blog_Publication p " +
                        "where p = :publication")
                .parameter("publication", publication)
                .view("author-rest-full")
                .optional().orElse(null);
    }
}